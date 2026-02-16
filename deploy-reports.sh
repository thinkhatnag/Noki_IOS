#!/bin/bash

# ============================================================
# Super Simple Deploy - Just Push Everything to Main
# Publishes main branch directly to GitHub Pages
# ============================================================

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Deploying to GitHub...${NC}\n"

# Check if report exists
if [ ! -f "reports/test-report.html" ]; then
    echo -e "${RED}❌ test-report.html not found!${NC}"
    echo "Run: node generate-report.js"
    exit 1
fi

# Copy test-report.html as index.html (for GitHub Pages default)
echo -e "${BLUE}📄 Creating index.html...${NC}"
cp reports/test-report.html index.html
echo -e "${GREEN}✓ Copied test-report.html to index.html${NC}"

# Add all files
echo -e "\n${BLUE}📦 Adding files...${NC}"
git add .

# Commit
COMMIT_MSG="Update test reports - $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Committed changes${NC}"
    
    # Pull first
    echo -e "\n${BLUE}📥 Pulling latest...${NC}"
    git pull origin main --rebase
    
    # Push
    echo -e "\n${BLUE}📤 Pushing to GitHub...${NC}"
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo -e "\n${GREEN}========================================${NC}"
        echo -e "${GREEN}✅ Deployment Complete!${NC}"
        echo -e "${GREEN}========================================${NC}"
        echo -e "\n📊 ${BLUE}Pushed to Main Branch:${NC}"
        echo -e "   • All your code"
        echo -e "   • allure-results/ (test data)"
        echo -e "   • generate-report.js"
        echo -e "   • reports/test-report.html"
        echo -e "   • index.html (copy of test-report.html)"
        echo -e "\n🌐 ${BLUE}GitHub Pages (after setup):${NC}"
        echo -e "   ${GREEN}https://thinkhatnag.github.io/test-reports/${NC}"
        echo -e "\n💡 ${YELLOW}First time? Enable GitHub Pages:${NC}"
        echo -e "   1. Go to: https://github.com/thinkhatnag/test-reports/settings/pages"
        echo -e "   2. Source: main branch"
        echo -e "   3. Folder: / (root)"
        echo -e "   4. Save"
    else
        echo -e "\n${RED}❌ Push failed!${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  Nothing new to commit${NC}"
fi

echo -e "\n${GREEN}🎉 Done!${NC}\n"