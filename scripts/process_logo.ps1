Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\Pooch IT\Desktop\blog 3\assets\naina_logo.png"
$croppedTransPath = "c:\Users\Pooch IT\Desktop\blog 3\assets\naina_logo_trans.png"
$croppedDarkPath = "c:\Users\Pooch IT\Desktop\blog 3\assets\naina_logo_dark_bg.png"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$width = $bmp.Width
$height = $bmp.Height

# Find bounding box of non-transparent pixels
$minX = $width
$minY = $height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.A -gt 20) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}


Write-Output "Detected Content Bounds: minX=$minX, minY=$minY, maxX=$maxX, maxY=$maxY"

$padding = 10
$cropX = [Math]::Max(0, $minX - $padding)
$cropY = [Math]::Max(0, $minY - $padding)
$cropW = [Math]::Min($width - $cropX, ($maxX - $minX) + ($padding * 2))
$cropH = [Math]::Min($height - $cropY, ($maxY - $minY) + ($padding * 2))

Write-Output "Cropping to: X=$cropX, Y=$cropY, W=$cropW, H=$cropH"

$transBmp = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$darkBmp = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $p = $bmp.GetPixel($cropX + $x, $cropY + $y)
        $transBmp.SetPixel($x, $y, $p)
        
        # For dark mode, brighten black text "TECHNOLOGIES" so it shows on dark backgrounds
        if ($p.A -gt 50 -and $p.R -lt 50 -and $p.G -lt 50 -and $p.B -lt 50) {
            $darkBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($p.A, 245, 248, 255))
        } else {
            $darkBmp.SetPixel($x, $y, $p)
        }
    }
}

$transBmp.Save($croppedTransPath, [System.Drawing.Imaging.ImageFormat]::Png)
$darkBmp.Save($croppedDarkPath, [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose()
$transBmp.Dispose()
$darkBmp.Dispose()

Write-Output "Cropped logo variants saved successfully!"
