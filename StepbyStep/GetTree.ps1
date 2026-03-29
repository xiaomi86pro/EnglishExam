$outputFile = "project_tree.txt"
$ignore = @(".git","node_modules","build","dist")
$extensions = @(".ts",".tsx",".js",".jsx",".css",".scss",".json",".md",".html",".env",".yml",".yaml",".png",".jpg",".svg")

function Show-Tree($path, $indent="") {
    Get-ChildItem -LiteralPath $path | Where-Object { $ignore -notcontains $_.Name } | Sort-Object PSIsContainer -Descending | ForEach-Object {
        if ($_.PSIsContainer) {
            "$indent+-- $_" | Out-File -FilePath $outputFile -Append
            Show-Tree $_.FullName "$indent|   "
        } else {
            # Lọc file theo extension
            if ($extensions -contains $_.Extension) {
                "$indent+-- $_" | Out-File -FilePath $outputFile -Append
            }
        }
    }
}

if (Test-Path $outputFile) { Remove-Item $outputFile }

"$PWD" | Out-File $outputFile
Show-Tree $PWD