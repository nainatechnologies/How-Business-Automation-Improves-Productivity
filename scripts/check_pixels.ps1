Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\Pooch IT\Desktop\blog 3\assets\naina_logo.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
Write-Output "Image Dimensions: $($bmp.Width) x $($bmp.Height)"

# Sample corners
$corners = @(
    [System.Drawing.Point]::new(0, 0),
    [System.Drawing.Point]::new(10, 10),
    [System.Drawing.Point]::new(100, 100),
    [System.Drawing.Point]::new(400, 400)
)
foreach ($pt in $corners) {
    $c = $bmp.GetPixel($pt.X, $pt.Y)
    Write-Output "Pixel at ($($pt.X), $($pt.Y)): R=$($c.R), G=$($c.G), B=$($c.B), A=$($c.A)"
}
$bmp.Dispose()
