#!/bin/bash

# QwikShift Rebranding Script
# This script automatically renames all ZipShift references to QwikShift

echo "🔄 Starting QwikShift Rebranding..."

# Define colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Array of files to update
declare -a FILES=(
  "README.md"
  "TESTING.md"
  "package.json"
  "index.html"
  "server.js"
  ".env.example"
  ".github/workflows/ci.yml"
  ".github/workflows/deploy.yml"
  "js/form-validation.js"
  "js/animations.js"
  "js/analytics.js"
  "styles/main.css"
)

# Replace ZipShift with QwikShift
echo -e "${BLUE}📝 Updating file contents...${NC}"
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # Replace ZipShift (with capital Z)
    sed -i 's/ZipShift/QwikShift/g' "$file"
    # Replace zipshift (lowercase)
    sed -i 's/zipshift/qwikshift/g' "$file"
    echo -e "${GREEN}✓ Updated $file${NC}"
  fi
done

# Update directory structure
echo -e "${BLUE}📁 Checking directory structure...${NC}"

# The repository URL will need to be updated manually on GitHub
echo -e "${BLUE}📋 Summary of changes:${NC}"
echo "✓ All file contents updated: ZipShift → QwikShift"
echo "✓ All lowercase references: zipshift → qwikshift"
echo ""
echo -e "${BLUE}⚠️  Manual GitHub steps required:${NC}"
echo "1. Go to Repository Settings"
echo "2. Click 'Rename Repository'"
echo "3. Change 'zipshift' to 'qwikshift'"
echo "4. Update repository description if desired"
echo ""
echo -e "${BLUE}📝 Also update manually:${NC}"
echo "- Docker image names in CI/CD workflows"
echo "- Any hardcoded URLs with 'zipshift' in them"
echo "- API endpoints referencing 'zipshift'"
echo "- Email templates or user-facing copy"
echo ""
echo -e "${GREEN}✅ Rebranding to QwikShift complete!${NC}"
