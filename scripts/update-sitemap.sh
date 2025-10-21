#!/bin/bash

# Sitemap Update Script for VaultDay
# This script updates the sitemap.xml file with current date and generates a new one

echo "🔄 Updating VaultDay Sitemap..."

# Get current date in YYYY-MM-DD format
CURRENT_DATE=$(date +%Y-%m-%d)

# Update the sitemap.xml file with current date
sed -i.bak "s/<lastmod>.*<\/lastmod>/<lastmod>$CURRENT_DATE<\/lastmod>/g" public/sitemap.xml

echo "✅ Sitemap updated with date: $CURRENT_DATE"

# Validate XML syntax
if command -v xmllint &> /dev/null; then
    echo "🔍 Validating XML syntax..."
    if xmllint --noout public/sitemap.xml; then
        echo "✅ XML syntax is valid"
    else
        echo "❌ XML syntax error detected"
        exit 1
    fi
else
    echo "⚠️ xmllint not found, skipping XML validation"
fi

# Check if sitemap is accessible
echo "🌐 Checking sitemap accessibility..."
if curl -s -o /dev/null -w "%{http_code}" https://vaultday.space/sitemap.xml | grep -q "200"; then
    echo "✅ Sitemap is accessible at https://vaultday.space/sitemap.xml"
else
    echo "⚠️ Sitemap may not be accessible yet (deployment in progress?)"
fi

echo "🎉 Sitemap update completed!"
echo ""
echo "📋 Next steps:"
echo "1. Submit sitemap to Google Search Console"
echo "2. Submit sitemap to Bing Webmaster Tools"
echo "3. Monitor indexing status"
echo ""
echo "🔗 Sitemap URL: https://vaultday.space/sitemap.xml"
