#!/bin/bash

set -e  # Exit immediately if a command fails

# Go to project folder
cd /Users/nagasubarayudu/Desktop/NokiAndroid || exit

echo "🔗 Setting correct origin remote..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/thinkhatnag/NikiAndroid.git

echo "➕ Staging only docs/..."
git add test  helper wdio.conf.js 

echo "💾 Committing changes..."
git commit -m "new aumadio manegment adn change in offline testing code and improments is reporting "

echo "⬆️ Pushing to GitHub..."
git push -u origin main

echo "✅ Done! Report available at: "https://github.com/thinkhatnag/NikiAndroid.git"

