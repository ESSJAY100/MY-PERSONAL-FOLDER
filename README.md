git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
# Stephen Joseph — Portfolio

This repository contains a simple, static portfolio site for Stephen Joseph (drilling engineering specialist). It's ready to deploy to AWS Amplify via GitHub.

Included files
- `index.html` — portfolio single-page site
- `css/style.css` — responsive styles
- `js/main.js` — small JS: menu, year, contact form handling
- `amplify.yml` — Amplify Console settings for a static site
- `.gitignore`, `LICENSE`

Contact form
- The contact form uses a mailto fallback by default — change the email address in `js/main.js` (mailto link) to your preferred email.
- To enable server-side form submission, sign up for a form service (Formspree, Netlify Forms, Getform, etc.) and paste the form endpoint URL into the `data-action` attribute on the `<form id="contactForm">` element in `index.html`. Example:

```html
<form id="contactForm" method="post" data-action="https://formspree.io/f/your-id">
	...
</form>
```

When `data-action` is set, the site will POST JSON to that endpoint and show success/error messages.

Quick deploy (PowerShell)

```powershell
cd "C:\Users\user\OneDrive\Desktop\MY PERSONAL FOLDER"
git init
git add .
git commit -m "chore: add portfolio site for Stephen Joseph"
# create a GitHub repo first, then add remote and push
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

Then connect the GitHub repo and branch in the AWS Amplify Console and deploy. Amplify will use `amplify.yml` to publish the static files.

If you want, I can initialize the git repo here and make the first commit for you, or add Formspree wiring and test it locally. Let me know which one you'd like next.
