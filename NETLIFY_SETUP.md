# Netlify Environment Variables Setup

To deploy this application successfully on Netlify, you need to configure the following environment variables:

## Required Environment Variables

Go to your Netlify site dashboard: **Site settings > Environment variables**

Add the following variables:

```
CONTENTFUL_SPACE_ID=lyqay1191tz4
CONTENTFUL_ACCESS_TOKEN=mL3hWrKQsdjKsdNTXPq3IIQwm4lSR_jyIkyrujm0XPE
CONTENTFUL_PREVIEW_ACCESS_TOKEN=W_xF3-ETk8ntYHqBSPIWfLY_-ySF5pDcJ0-iqkPEPkQ
CONTENTFUL_REVALIDATE_SECRET=my-super-secret-key
```

## Steps to Add Environment Variables in Netlify:

1. Log in to your Netlify account
2. Go to your site dashboard
3. Click on **Site settings**
4. Navigate to **Environment variables** in the left sidebar
5. Click **Add a variable** or **Add environment variables**
6. Add each variable name and value from above
7. Make sure to set the scope to **All scopes** or at least **Builds** and **Functions**
8. Click **Save**
9. Trigger a new deployment by pushing to your repository or clicking **Trigger deploy** > **Deploy site**

## Alternative: Using Netlify CLI

If you have Netlify CLI installed, you can also set variables using:

```bash
netlify env:set CONTENTFUL_SPACE_ID "lyqay1191tz4"
netlify env:set CONTENTFUL_ACCESS_TOKEN "mL3hWrKQsdjKsdNTXPq3IIQwm4lSR_jyIkyrujm0XPE"
netlify env:set CONTENTFUL_PREVIEW_ACCESS_TOKEN "W_xF3-ETk8ntYHqBSPIWfLY_-ySF5pDcJ0-iqkPEPkQ"
netlify env:set CONTENTFUL_REVALIDATE_SECRET "my-super-secret-key"
```

## Verification

After setting the environment variables:

- Trigger a new build
- Check the build logs to ensure no errors about missing environment variables
- The build should complete successfully and generate static pages
