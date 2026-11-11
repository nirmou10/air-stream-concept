Add-Type -AssemblyName System.Drawing
$dir = "C:\Users\NexTech\Downloads\pixel-perfect-main\pixel-perfect-main\public\images"
$files = Get-ChildItem "$dir\*.jpg"
$maxW = 1600
$limit = 350KB
foreach ($f in $files) {
  $src = [System.Drawing.Image]::FromFile($f.FullName)
  $w = $src.Width; $h = $src.Height
  $newW = $w; $newH = $h
  if ($w -gt $maxW) { $newW = $maxW; $newH = [int]($h * $maxW / $w) }
  $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($src, 0, 0, $newW, $newH)
  $g.Dispose(); $src.Dispose()

  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $q = 88
  $saved = $false
  while ($q -ge 40) {
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$q)
    $tmp = "$($f.FullName).tmp"
    $bmp.Save($tmp, $enc, $ep)
    $ep.Dispose()
    $size = (Get-Item $tmp).Length
    if ($size -lt $limit) {
      Move-Item -Force $tmp $f.FullName
      $saved = $true
      break
    }
    Remove-Item $tmp -Force
    $q -= 6
  }
  if (-not $saved) {
    # last resort: keep q=40 output regardless
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]40)
    $bmp.Save($f.FullName, $enc, $ep)
    $ep.Dispose()
  }
  $bmp.Dispose()
  $final = Get-Item $f.FullName
  Write-Output ("{0}: {1}x{2} -> {3}x{4}, {5:N0} KB" -f $f.Name, $w, $h, $newW, $newH, ($final.Length/1KB))
}
