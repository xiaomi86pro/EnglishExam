$outputFile = "project_tree.txt"

# Ignore theo PATH (quan trọng)
$ignorePattern = '\\.git\\|\\node_modules\\|\\build\\|\\dist\\|\\.next\\|\\.turbo\\|\\.cache\\|coverage\\'
# Chỉ giữ file làm việc
$extensions = @(".ts",".tsx",".js",".jsx",".css",".scss",".json",".md",".html",".env",".yml",".yaml",".png",".jpg",".svg")

function Show-Tree($path, $indent="") {
    Get-ChildItem -LiteralPath $path | Where-Object { $_.FullName -notmatch $ignorePattern } |
    Sort-Object PSIsContainer -Descending | ForEach-Object {

        if ($_.PSIsContainer) {
            "$indent+-- $($_.Name)" | Out-File -FilePath $outputFile -Append
            Show-Tree $_.FullName "$indent|   "
        } else {
            if ($extensions -contains $_.Extension) {
                "$indent+-- $($_.Name)" | Out-File -FilePath $outputFile -Append
            }
        }
    }
}

if (Test-Path $outputFile) { Remove-Item $outputFile }

"$PWD" | Out-File $outputFile
Show-Tree $PWD