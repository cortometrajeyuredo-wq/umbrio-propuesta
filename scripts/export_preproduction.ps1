# Export the selected Umbrío artwork to JPEG thumbnails and full views.
# Usage: powershell -ExecutionPolicy Bypass -File scripts/export_preproduction.ps1
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$project = Split-Path -Parent $PSScriptRoot
$archive = Join-Path (Split-Path -Parent $project) '2. Arte'
$output = Join-Path $project 'public\preproduccion'
$manifest = Get-Content -LiteralPath (Join-Path $project 'src\data\preproduction.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -EQ 'image/jpeg'
$qualityEncoder = [System.Drawing.Imaging.Encoder]::Quality
New-Item -ItemType Directory -Path $output -Force | Out-Null

foreach ($item in $manifest) {
  $source = Join-Path $archive ($item.source.Replace('/', [IO.Path]::DirectorySeparatorChar))
  $resolved = (Resolve-Path -LiteralPath $source).Path
  if (-not $resolved.StartsWith($archive + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
    throw "Outside archive: $resolved"
  }

  $original = [System.Drawing.Image]::FromFile($resolved)
  try {
    foreach ($variant in @(@{ Suffix = '-thumb'; Width = 720; Quality = 78L }, @{ Suffix = ''; Width = 2200; Quality = 85L })) {
      $scale = [Math]::Min(1.0, [Math]::Min($variant.Width / $original.Width, ($variant.Width * 2) / $original.Height))
      $width = [Math]::Max(1, [int][Math]::Round($original.Width * $scale))
      $height = [Math]::Max(1, [int][Math]::Round($original.Height * $scale))
      $canvas = New-Object System.Drawing.Bitmap($width, $height)
      $graphics = [System.Drawing.Graphics]::FromImage($canvas)
      $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
      try {
        $graphics.Clear([System.Drawing.Color]::FromArgb(35, 28, 24))
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.DrawImage($original, 0, 0, $width, $height)
        $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($qualityEncoder, $variant.Quality)
        $destination = Join-Path $output ($item.id + $variant.Suffix + '.jpg')
        $canvas.Save($destination, $jpegCodec, $parameters)
      } finally {
        $parameters.Dispose()
        $graphics.Dispose()
        $canvas.Dispose()
      }
    }
    Write-Output "Exported $($item.id)"
  } finally {
    $original.Dispose()
  }
}

$storyboard = Get-ChildItem -LiteralPath (Join-Path $archive '1. Storyboard') -File -Filter '*.pdf' | Where-Object { $_.BaseName -ne 'Plantilla Storyboard' }
if (@($storyboard).Count -ne 1) { throw 'Expected one final storyboard PDF' }
Copy-Item -LiteralPath $storyboard.FullName -Destination (Join-Path $output 'storyboard-umbrio.pdf') -Force
Write-Output "Exported $($manifest.Count) images and storyboard"
