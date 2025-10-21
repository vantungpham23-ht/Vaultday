#!/bin/bash

# Test Local Database Setup Script
# This script helps test the database changes locally before pushing to production

echo "🧪 Testing Local Database Setup..."

# Check if we're in local environment
if [ "$NODE_ENV" != "development" ]; then
    echo "⚠️  Warning: This script should be run in development environment"
    echo "   Set NODE_ENV=development or run: export NODE_ENV=development"
fi

echo ""
echo "📋 Database Migration Steps:"
echo "1. Connect to your Neon database console"
echo "2. Run the migration script: migration-add-username.sql"
echo "3. Verify the username column was added"
echo ""

echo "🔗 Migration Script Location:"
echo "   File: migration-add-username.sql"
echo "   Content:"
echo "   - Adds username column to messages table"
echo "   - Updates existing messages with placeholder usernames"
echo "   - Sets Anonymous for messages without user_id"
echo ""

echo "🧪 Local Testing Steps:"
echo "1. Run migration script in database"
echo "2. Start local development server: npm start"
echo "3. Test sending messages with username"
echo "4. Verify messages display correctly"
echo "5. Check console for any errors"
echo ""

echo "📊 Expected Results:"
echo "✅ Messages table has username column"
echo "✅ New messages include username"
echo "✅ Existing messages have placeholder usernames"
echo "✅ No database errors in console"
echo "✅ Chat room displays usernames correctly"
echo ""

echo "🚀 Ready to test!"
echo "   Run: npm start"
echo "   Then test in browser: http://localhost:4200"
