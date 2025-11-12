#!/bin/bash

# Go to project folder
cd /Users/nagasubarayudu/Desktop/IOS || exit

echo "🔗 Setting correct origin remote..."
git remote add origin https://github.com/thinkhatnag/allure-reports.git

echo "💾 Committing changes..."
git commit -m "Update Allure report $(date +'%Y-%m-%d')" || echo "⚠️ Nothing to commit."

echo "⬆️ Pushing to GitHub..."
git push -u origin main

echo "✅ Done! Report available at: https://thinkhatnag.github.io/allure-reports/"
