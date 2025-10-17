# Discord Notifications Setup 🔔

This project integrates Discord notifications to provide real-time updates on CI/CD pipeline status.

## 📋 Configuration

### Prerequisites

1. **Discord Webhook URL**
   - Go to your Discord server
   - Navigate to **Server Settings** → **Integrations** → **Webhooks**
   - Click **New Webhook** or **Create Webhook**
   - Choose a channel (e.g., `#ci-cd-notifications`)
   - Copy the **Webhook URL**

### Setup Instructions

#### GitHub Actions

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `DISCORD_WEBHOOK_URL`
5. Value: Paste your Discord webhook URL
6. Click **Add secret**

#### GitLab CI/CD

1. Go to your project on GitLab
2. Navigate to **Settings** → **CI/CD** → **Variables**
3. Click **Add variable**
4. Key: `DISCORD_WEBHOOK_URL`
5. Value: Paste your Discord webhook URL
6. Uncheck **Protect variable** (to work on all branches)
7. Check **Mask variable** (for security)
8. Click **Add variable**

## 🔔 Notification Types

### GitHub Actions Notifications

#### ✅ Deploy Success

- **Trigger:** When deployment to Netlify succeeds
- **Color:** Green (#2ECC71)
- **Information:**
  - Repository name
  - Branch name
  - Commit SHA
  - Author
  - Deploy URL

#### ❌ Deploy Failed

- **Trigger:** When deployment to Netlify fails
- **Color:** Red (#E74C3C)
- **Information:**
  - Repository name
  - Branch name
  - Commit SHA
  - Author
  - Link to logs

#### 🔍 Lighthouse Analysis Complete

- **Trigger:** When Lighthouse CI analysis succeeds
- **Color:** Blue (#3498DB)
- **Information:**
  - Repository name
  - Branch name
  - Website URL
  - Link to artifacts

#### ⚠️ Lighthouse Analysis Failed

- **Trigger:** When Lighthouse scores don't meet thresholds
- **Color:** Orange (#E67E22)
- **Information:**
  - Repository name
  - Branch name
  - Link to logs

### GitLab CI Notifications

#### ✅ GitLab Deploy Success

- **Trigger:** When GitLab deployment succeeds
- **Color:** Green (#2ECC71)
- **Information:**
  - Project path
  - Branch name
  - Short commit SHA
  - Author
  - Deploy URL

#### ❌ GitLab Deploy Failed

- **Trigger:** When GitLab deployment fails
- **Color:** Red (#E74C3C)
- **Information:**
  - Project path
  - Branch name
  - Short commit SHA
  - Link to job logs

#### 🔍 GitLab Lighthouse Analysis Complete

- **Trigger:** When GitLab Lighthouse analysis succeeds
- **Color:** Blue (#3498DB)
- **Information:**
  - Project path
  - Branch name
  - Website URL
  - Link to artifacts

#### ⚠️ GitLab Lighthouse Failed

- **Trigger:** When GitLab Lighthouse fails
- **Color:** Orange (#E67E22)
- **Information:**
  - Project path
  - Branch name
  - Link to job logs

## 🎨 Embed Colors

- **Green** (#2ECC71 / 3066993): Success
- **Red** (#E74C3C / 15158332): Failure
- **Blue** (#3498DB / 3447003): Information
- **Orange** (#E67E22 / 15105570): Warning

## 📊 Benefits

- ✅ **Real-time notifications** - Instant feedback on pipeline status
- ✅ **Centralized monitoring** - All notifications in one Discord channel
- ✅ **Quick debugging** - Direct links to logs and artifacts
- ✅ **Team collaboration** - Everyone stays informed
- ✅ **Professional setup** - Industry-standard DevOps practice

## 🔒 Security

- Webhook URLs are stored as secrets (encrypted)
- Variables are masked in GitLab CI logs
- No sensitive data is exposed in Discord messages
- Only commit SHAs and public URLs are shared

## 🧪 Testing

To test the notifications:

1. **GitHub:** Make a commit to `master` branch
2. **GitLab:** Push to GitLab `master` branch
3. Check your Discord channel for notifications

Expected behavior:

- Deploy notification appears after successful deployment
- Lighthouse notification appears after performance analysis
- Failed jobs trigger failure notifications

## 📝 Example Messages

### Success Message

```
✅ Deploy Successful
Website deployed to production

Repository: nexuhss/tdw-mp1-henrique-policarpo
Branch: master
Commit: 7b883e0a
Author: nexuhss
Deploy URL: https://tdw-mp1-henrique-policarpo.netlify.app
```

### Failure Message

```
❌ Deploy Failed
Deployment to production failed

Repository: nexuhss/tdw-mp1-henrique-policarpo
Branch: master
Commit: 7b883e0a
Logs: [View Logs](https://github.com/...)
```

## 🛠️ Troubleshooting

### Notifications not appearing?

1. **Check webhook URL is correct**
   - Verify the secret is set in both GitHub and GitLab
   - Webhook URL should start with `https://discord.com/api/webhooks/`

2. **Check Discord channel permissions**
   - Webhook must have permission to post in the channel
   - Channel must exist and be accessible

3. **Check CI/CD logs**
   - GitHub: Actions tab → Select workflow → Check logs
   - GitLab: CI/CD → Pipelines → Select pipeline → Check job logs
   - Look for curl errors in notification steps

4. **Webhook URL format**
   - Must be complete webhook URL
   - No trailing slashes
   - No extra spaces

### Discord webhook limits

- **Rate limit:** 30 requests per minute per webhook
- **Message size:** 2000 characters max per message
- **Embed limits:** 10 embeds per message

## 📚 References

- [Discord Webhooks Guide](https://discord.com/developers/docs/resources/webhook)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitLab CI Variables](https://docs.gitlab.com/ee/ci/variables/)
