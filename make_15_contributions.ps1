# Auto-generated script to make 15 contributions

$file = "dummy_contributions.txt"
$branch = "main"

# Ensure the file exists
if (-not (Test-Path $file)) {
    New-Item -ItemType File -Path $file
}

for ($i = 1; $i -le 15; $i++) {
    # Append a line with timestamp
    Add-Content -Path $file -Value "Contribution entry $i at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    
    # Git operations
    git add $file
    git commit -m "chore: contribution update $i"
    Write-Host "Committed update $i of 15"
}

Write-Host "Pushing changes to GitHub..."
git push origin $branch
Write-Host "Finished making 15 contributions!"
