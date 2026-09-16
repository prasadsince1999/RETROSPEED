# Microsoft Store Publishing — AI Agent Context

Source: `windows-apps-publish.pdf` (Microsoft Learn export, 830 pages), reviewed as a whole.
Primary purpose of this document: give an IDE AI agent the operational knowledge needed to build, package, validate, submit, certify, publish, update, and maintain Windows apps in the Microsoft Store through Partner Center.

> IMPORTANT SOURCE RULE
> This file is a distilled operational context extracted from the supplied PDF. It is not a replacement for the live Microsoft Store documentation. The PDF contains multiple articles with different last-updated dates and a Store Policies document (version 7.19). When a live publishing decision depends on a rule that may have changed, the agent should verify the current Microsoft documentation before acting.

## 1. Core mental model

Microsoft Partner Center is the control plane for Windows Store publishing. The normal lifecycle is:

1. Have an active Windows developer account in Partner Center.
2. Choose the distribution/package path: preferably MSIX for most Windows desktop apps; EXE/MSI is also supported; PWA is supported for applicable products.
3. Reserve a unique Store product name.
4. Create a submission.
5. Complete Pricing & Availability, Properties, Age Ratings, Packages, Store Listings, and optional Submission Options.
6. Validate the package before submission.
7. Submit for certification.
8. Microsoft performs preprocessing, security/technical/content checks, and certification.
9. After certification, the app enters Publishing and then becomes `In the Store` unless a release/visibility rule holds it back.
10. Later releases are new submissions. Metadata-only changes still go through certification.

The supplied documentation strongly recommends MSIX because it provides Microsoft-hosted binary distribution, Microsoft Store signing, Store commerce integration, package flighting, deeper Windows integration, and Windows 11 backup/restore support.

## 2. Developer account types

### Individual account

Use Individual when publishing under the developer's own name for scenarios such as independent/non-business distribution, hobby/amateur work, school/personal projects, or other non-commercial personal distribution described by Microsoft.

Important onboarding facts from the PDF:
- New individual onboarding has no registration fee; the older $19 fee is waived in the new flow.
- Entry point for the new individual flow: `storedeveloper.microsoft.com`.
- Individual signup must use a personal Microsoft account (MSA); Microsoft Entra ID work-account signup is not supported for the individual flow.
- Identity verification uses a government-issued ID and selfie.
- Capture ID and selfie on a mobile device with good lighting and original documents.
- Profile information can be auto-filled from the verification flow and should be reviewed.
- Complete setup and select `Go to Partner Center dashboard`.
- Use the SAME Microsoft account when the MSA picker appears.
- The Apps & Games workspace can take several minutes to appear after onboarding; the PDF says to wait about 5 minutes and refresh if needed.
- New onboarding is intended for first-time individual developers.

### Company account

Use Company when publishing for a business/organization or when the app's publishing identity is a legal/trade business entity. The PDF explicitly includes independent developers/freelancers publishing in relation to their business or profession.

Important company onboarding facts:
- New company onboarding has no registration fee; the PDF says the prior $99 fee is waived in the new flow.
- Entry point: `storedeveloper.microsoft.com`.
- Company signup can use either a personal Microsoft account (MSA) or a Microsoft Entra ID work account.
- If an Entra ID account is used, the entire Microsoft Entra tenant is onboarded. The person who completes onboarding gets Owner permissions by default; other tenant users need roles assigned through Partner Center User management.
- Business verification can use either:
  - A valid 9-digit D-U-N-S number (recommended; faster automated retrieval), or
  - Official business documents such as certificate/articles of incorporation, partnership deed/equivalent formation document, government business registration/license, official company registry record, tax filings, or stock-exchange filings.
- Document-based verification may enter manual review and the PDF says this can take about 3–5 business days.
- Contact/employment verification should use a work email matching the organization's domain. Personal domains such as Gmail/Yahoo are not accepted for that verification field.
- If the email domain does not match, Microsoft may request domain-ownership evidence such as an official domain record/invoice.
- Mandatory due diligence is a blocking verification step. Business/employment verification proceeds only after it passes.
- Manual reviews are described as typically taking 2–5 business days.
- Each business and employment verification type allows up to three verification appeals.
- Updating key verification details such as company name, address, or email domain restarts verification and does not carry over prior appeal history.
- After verification, finish account setup and select `Publish to Store`.
- Partner Center propagation can take up to about 30 minutes before submission access is fully reflected.

### Account identity rules

- Country/region selected during developer account creation cannot be changed later.
- Publisher Display Name is customer-facing and appears in the Store.
- Company accounts publish under the organization's legal or trade name.
- For company accounts, business/contact verification information must remain accurate and current.

## 3. Partner Center navigation model

Current/new workspace terminology in the PDF:
- `Apps and games` workspace: create and manage products/submissions.
- `Insights` workspace: analytics reports/highlights.
- `Earnings` workspace: earnings reports.
- `Account settings`: user management, permissions, account profile, tax/support/contact details, Microsoft Entra applications, etc.

Typical new-product path:
1. Sign in to Partner Center.
2. Open `Apps and games`.
3. Select `+ New product`.
4. Choose the product type, such as MSIX/PWA, EXE/MSI, or game where appropriate.

Existing-product path:
1. Open `Apps and games`.
2. Search/filter for the product.
3. Open the product.
4. Create an update/new submission from the product's release/update controls.

## 4. Reserve the Store name before publishing

Every Microsoft Store app needs a unique name.

Reservation workflow:
1. Open Apps and Games.
2. Select `New product`.
3. Choose the product type.
4. Enter the desired name.
5. `Check availability`.
6. If available, select `Reserve product name`.

Reservation duration:
- The PDF says a reserved name is held for up to 3 months before publishing.
- Another section says an unused reservation is removed after 3 months.
- Multiple candidate names can be reserved if needed; select the final reserved name when ready.
- App names should be distinct and informative.
- Avoid emojis and unsupported special characters.
- Do not stuff marketing/descriptive text or unrelated keywords into the product name.

Name/listing nuance:
- The Store `Product name` applies to the Store listing in that language.
- The installed application's displayed name comes from the installed package.
- Keep package/app name and Store listing name aligned to avoid customer confusion.

## 5. Recommended packaging strategy

### Prefer MSIX when possible

The supplied docs recommend MSIX for apps built with frameworks such as UWP, Win32, PWA, WinApp SDK, etc.

MSIX advantages explicitly described:
- Complimentary Microsoft binary hosting/CDN distribution.
- Complimentary Microsoft code signing for Store distribution.
- Microsoft Store commerce platform integration.
- Package flighting.
- Advanced Windows integration, including things such as Share dialog and `launch from Store` scenarios.
- Windows 11 backup and restore integration.
- Cleaner installation/update experience.
- Better Store-managed update lifecycle.
- S-Mode support.
- Private-app publishing support.

### EXE/MSI is still supported

Unpackaged Win32 distribution is supported in the Store and is useful when an existing installer should remain largely unchanged.

Tradeoffs versus MSIX:
- Publisher hosts the installer and pays associated hosting costs.
- Publisher manages its own update mechanism.
- Publisher must provide its own CA-trusted code signing.
- No Store private-app publishing for this path.
- No package flighting for this path.
- Less advanced Windows integration.
- Not supported for S-Mode.
- Windows 11 backup/restore behavior is more limited: Start-menu icons may restore but can point to the Store product page.

## 6. Submission workflow — exact sections

After the product name is reserved:

1. Open the app overview.
2. Select `Start Submission` / create a new submission.
3. Complete the required sections.
4. Save each section.
5. Fix any `Incomplete` status.
6. Select `Submit for certification`.

The core sections are:

### A. Pricing and Availability

Configure:
- Pricing model/base price.
- Markets.
- Discoverability/visibility.
- Free trial where applicable.
- Release schedule.
- Stop-acquisition schedule.
- Sale pricing where applicable.
- Organizational licensing where applicable.

The Store reaches more than 200/240 markets depending on the article's date/version; the PDF repeatedly says the Store is available in 200+ markets and elsewhere states more than 240 markets. Default behavior is to offer the app in all possible markets, including future markets, unless markets are explicitly restricted.

### B. Properties

Configure:
- Primary category.
- Optional subcategory.
- Optional secondary category.
- Privacy policy URL when required.
- Website/support information where applicable.
- Product declarations.
- Accessibility declaration where applicable.
- System/hardware requirements where needed.
- Certain capability/dependency disclosures.

### C. Age Ratings

- Complete the International Age Rating Coalition (IARC) questionnaire.
- All questions must be answered accurately.
- Publisher display name and email are shared with IARC as part of the rating process.
- The resulting rating is used for customer-facing Store presentation in different markets.

### D. Packages

At least one valid package is required.

For MSIX/AppX, upload the appropriate Store package file(s).
For EXE/MSI, provide package metadata plus a versioned secure download URL to the installer.

### E. Store Listings

At minimum, provide:
- Product name.
- Description.
- At least one screenshot.
- Store logo as required for the target OS/display scenarios.

Recommended:
- Strong short description.
- Feature list.
- 4+ screenshots; another guidance section recommends 5–8 strong screenshots for each supported device type.
- Localized Store listings.
- Promotional art/trailer where useful.
- Search keywords.
- Website/support information.

### F. Submission Options (mostly optional)

Possible controls include:
- Publishing hold options.
- Certification notes.
- Restricted capabilities declarations when applicable.
- Notification audience.
- Release scheduling/controlled publishing.

## 7. Required submission data checklist

Minimum conceptual checklist for a normal Windows Store app:

Account:
- Active developer account.
- Correct Individual vs Company account type.
- Verified identity/business information.
- Correct country/region.
- Publisher display name.

Product:
- Reserved unique product name.
- Correct product type.
- Correct category/subcategory.
- Accurate Store description.
- Age rating completed.
- Required privacy policy.
- Required screenshots/assets.
- At least one valid package.

Release:
- Price/monetization configured.
- Markets configured.
- Visibility configured.
- Release timing configured if needed.
- Certification notes prepared for anything a tester must know.
- Restricted capability/dependency disclosures completed where relevant.

## 8. MSIX package requirements

### Package types supported

The PDF lists:
- `.msix`
- `.msixbundle`
- `.msixupload`
- `.appx`
- `.appxbundle`
- `.appxupload`

`.xap` is a legacy type and is not for new submissions.

### Architecture

Supported package architecture values described in the Store package flow:
- x86
- x64
- neutral
- ARM
- ARM64

Best practice from the PDF:
- Build packages for every architecture you actually support.
- Generate app bundles when possible so the Store can select the best package for the customer's device.
- For Windows 10+ Store submissions, `.msixupload` / `.appxupload` is recommended over uploading only a raw `.msix`/`.appx`/bundle when the tooling provides it.

### Symbols and crash analytics

An `.msixupload` / `.appxupload` can contain a symbol file (`.appxsym`).
- The symbol file is a compressed `.pdb` containing public symbols.
- It is used for Partner Center crash analytics.
- If omitted, crash analytics/debugging information for those symbols is unavailable.

### Manifest/account identity

If building the package manually:
- The manifest must conform to the package manifest schema.
- Values are case-sensitive.
- Spaces and punctuation must match exactly.
- Manifest contains app/account-specific identity information.
- Get the app identity information from Partner Center's `View app identity details` / Product management area.
- Using Visual Studio with the SAME account associated with the Store developer account can auto-populate some account-specific manifest data.
- Wrong manifest identity values can cause package upload failure.

### Signing for MSIX Store submission

For Microsoft Store distribution:
- The MSIX/AppX package does NOT need a CA-trusted certificate before submission.
- No paid CA-trusted certificate is required for Store submission.
- No `.pfx` or `.cer` from a CA is required for Store submission.
- No hardware token/HSM is required for Store submission.
- After certification, the Microsoft Store automatically re-signs the package with a Microsoft certificate.
- The Microsoft signature protects the published package against tampering and provides customer trust.

For EXTERNAL/non-Store distribution of the same MSIX:
- The publisher must sign the package themselves with a valid code-signing certificate.

## 9. EXE/MSI package requirements

EXE/MSI is an allowed Store path, but the requirements are stricter around the installer.

### Installer type
- Installer must be `.exe` or `.msi`.
- It must be a standalone/offline installer.
- It must NOT be a downloader stub that fetches binaries during setup.
- It must install only the intended product and not bundle unrelated third-party software.

### Download URL
- Provide a direct HTTPS URL.
- URL must be versioned.
- Example pattern: `https://example.com/downloads/1.1/setup.exe`.
- The binary at the submitted URL must not change after submission.
- For each updated installer, submit a new versioned URL in a new submission.
- Publisher is responsible for URL availability, reliability and performance.

### Signing
- The installer binary and its PE files must be digitally signed with a certificate chaining to a CA in the Microsoft Trusted Root Program.
- Microsoft does NOT re-sign EXE/MSI installers.

### Installation behavior
- Silent installation is required; installation UI should not appear.
- UAC prompts are allowed.
- MSI uses `/qn` as the default silent switch in the Store flow.
- EXE installers may expose custom return codes and the Store can map suitable customer-facing messages/actions to them.
- Installer should work for a standard Windows user where applicable.
- Installer should create appropriate Start-menu/Programs entries; if the app intentionally does not, explain why in certification notes.
- Installer metadata should expose ProductName, Publisher Name, Default Language, Version etc. where Windows expects it.
- Uninstallation should be clean and remove unnecessary residual files, folders and registry entries.

### Win32 package versioning

For MSI/EXE, package version numbering is managed through the installer; the Store does not provide package version numbering.

## 10. Store listing content limits and asset rules

### Text

MSIX Store listing guidance in the PDF:
- Description: up to 10,000 characters, plain text.
- Short description: up to 1,000 characters; some Store views only show the first ~270 characters, so keeping it under 270 is recommended.
- Feature item: max 200 characters each.
- Feature count: up to 20 for the main listing guidance; another store field table shows 11 in an older/alternate field context, so follow the exact field shown by the current Partner Center UI for the product type.
- Product name must be a reserved Store name.
- `What's new` is optional; use it for updates rather than the first submission.
- Do not manually type bullets into feature entries; the Store renders them as a bulleted list.
- Do not put HTML, code snippets, or URLs into the description field. Use designated website/privacy/support fields.
- Store copy should accurately explain value, functionality, benefits, limitations, trials, subscriptions and purchases.

### Keywords

- Up to 7 keywords/search terms.
- Maximum 40 characters per keyword.
- Maximum 21 distinct words across the full keyword set.
- Must be relevant.
- Do not use pricing terms such as “free”/“best” as generic promotional search terms.
- Do not use another product's title unless that product is also published by you.
- Keywords are not displayed to customers but affect Store search/discoverability.
- The PDF describes AI-generated keyword recommendations based on the app name/description.

### Copyright/trademark
- Around 200 characters in the dedicated copyright/trademark field.

### Additional license terms
- Can be plain text up to 10,000 characters, or a URL can be used for longer/linked formatting.
- Leave blank to use the standard application license terms when appropriate.

### Developed by
- Optional.
- Up to 255 characters.
- `Published by` always reflects the publisher display name associated with the account.

### Screenshots
- Required: 1.
- Maximum: 10.
- Basic recommendation: 4+.
- Another FAQ recommends 5–8 high-quality screenshots for each supported device type.
- Show important functionality, scenarios and workflows.
- Localize them where possible.

### Common image guidance from the PDF
- Desktop screenshot: 1366×768 or larger; 4K 3840×2160 supported.
- 1:1 app tile/icon guidance: 300×300.
- 16:9 Super Hero art: 1920×1080 or 3840×2160.
- 2:3 Poster art: 720×1080 or 1440×2160.
- Featured Promotional Square art: 1080×1080; PDF says it should not include the product title.
- Titled Hero art: 1920×1080; title/key imagery should stay in the top ~75% because an overlay may cover the bottom quarter.
- Trailer thumbnail: 1920×1080 PNG in the trailer flow.
- Xbox publishing needs extra Xbox-specific images and a 2:3 image for best display.

## 11. Pricing, markets, visibility and scheduling

### Pricing models

For MSI/EXE/PWA-style submissions, the PDF lists models including:
- Free
- Freemium
- Subscription
- Paid

Base price is generally required unless the product is configured for a stop-acquisition/unavailable state where pricing is not applicable.

Microsoft periodically updates recommended market prices for currency changes. This does not automatically change the product price; the publisher controls whether to update.

Market-specific price overrides can be created using market groups.

### Markets

- Store is global, 200+ / 240+ markets depending on the article's dated copy.
- All possible markets are selected by default.
- Publisher may restrict markets.
- Local legal requirements remain the publisher's responsibility even when a market is selectable in Partner Center.

### Visibility/discoverability

Key concepts:
- Public audience.
- Private audience for controlled distribution/testing (MSIX path).
- Public listing but not discoverable: direct-link-only acquisition.
- Make unavailable/stop acquisition.

For private audience:
- Suitable for beta/pre-release controlled testing.
- Private users can obtain the app by the appropriate invitation/link mechanism.
- Their reviews are visible to the developer but are not public Store listing reviews.
- Choose Private audience instead of ordinary discoverability restrictions when the intention is controlled testing.
- Once a product is submitted with Public audience, the PDF says changing to Private audience later is not supported in that path; choose carefully at the start.

### Release scheduling

The schedule supports:
- Release as soon as possible (default).
- Specific release date/time.
- UTC-based release at the same time everywhere.
- Local-time release based on the market's time zone.
- Stop acquisition date.
- Per-market or per-market-group schedules.

Important:
- Release schedule primarily applies to Windows 10/11 in the described flow.
- Once an app is already published, you cannot keep using the first-release `Release date` setting as though it were unreleased.
- Stop acquisition stops NEW acquisition; existing owners can continue to use the app and may still obtain updates.
- `Make app unavailable` is stronger: after a few hours it is no longer visible to new customers, but existing customers can still use and redownload it. A later re-enable can make it available again subject to the last submission's visibility settings.

## 12. Free trials and monetization

The PDF describes Microsoft Store support for monetization such as:
- In-app purchases.
- Subscriptions.
- Advertising.
- Tips/donations in allowed scenarios.

Commerce choice described in the PDF:
- Non-gaming apps may use their own commerce platform and keep 100% of revenue under the described model.
- If Microsoft commerce is used, the PDF states a 15% fee for apps and 12% for games.
- Choose the commerce model intentionally based on whether you need Store-managed purchasing/licensing or prefer external commerce.

Free trial guidance in the pricing flow:
- No trial is the default.
- Time-limited trial options include 1, 7, 15 and 30 days.
- Trial start/stop dates can be scheduled.

### Financial-information restriction — VERY IMPORTANT

The Store Policy says:
- If the product requires financial account information, it must be submitted from a Company account.
- Individual-account products cannot require financial information for primary functionality.
- “Financial information” in the policy is broad and includes bank/credit-card account information, account PIN/password, tax ID information, initiating cryptocurrency transactions, access to cryptocurrency exchanges, API secret keys, private keys and recovery phrases.

Therefore the IDE agent must STOP and flag the account-type issue if app functionality starts requiring any of those categories for primary functionality.

## 13. In-app purchases and subscriptions

From the policies and add-on documentation:
- Store add-ons can be Consumable, Durable, or Subscription products.
- Consumables may be developer-managed or Store-managed depending on target/support.
- Durable products usually unlock functionality and can have an expiry lifetime from 1 to 365 days instead of the default Forever.
- Subscription add-ons recur until cancellation.
- Subscription add-ons have Windows 10 version/SDK prerequisites in the legacy Windows Store API flow described by the docs.
- For PC non-game digital subscriptions, secure third-party recurring billing or Microsoft's recurring billing API may be used under the stated policy rules.
- If an active subscription is discontinued, previously purchased digital goods/services must remain available until the subscription expires.
- Product metadata must explain purchase types, applicable price ranges and trial terms clearly.
- Randomized virtual-item/loot-box systems must disclose odds before purchase where applicable.
- Physical-goods/real-world-payment scenarios have separate payment API and secure third-party API requirements.

## 14. Privacy, support, accessibility and declarations

### Privacy policy

The PDF repeatedly states:
- Provide a valid privacy policy URL when the app accesses, collects, transmits, or otherwise handles personal information where required by law/policy.
- The privacy policy must remain current as functionality changes.
- Microsoft does not supply a default privacy policy for the developer.
- Product types that inherently access Personal Information, including the policy's Desktop Bridge and Win32 examples, are required to have privacy policies.

### Support contact

- Support contact is strongly recommended even when not required.
- It is required for products available on Xbox in the described Store listing flow.
- Company accounts must provide accurate contact information for verification and Store support/legal scenarios.

### Accessibility

Only declare an app accessible when it actually meets the accessibility expectations described by the Store guidance.

The PDF mentions verification using tools/scenarios including:
- Narrator
- Magnifier
- On-Screen Keyboard
- High Contrast
- High DPI

False accessibility claims can create certification problems.

### Product declarations

Declarations can affect Store display, customer eligibility and how customers use the product. Examples include accessibility and backup-related declarations, and capability/dependency disclosures.

### Hardware/system requirements

Optional. If entered, they appear in the Store listing and can cause the Store to warn customers whose hardware does not meet the declared requirements.

If the app has hardware requirements not represented elsewhere (e.g. a special device), put them in the additional system requirements text as well.

## 15. Certification — what Microsoft checks

Typical certification duration stated by the PDF:
- Up to about 3 business days.
- It can be quicker.

After approval:
- Publishing itself takes a few minutes.
- Store listing visibility is typically around 15 minutes depending on location.
- Status becomes `In the Microsoft Store` / `In Store`.

### Certification categories

Microsoft checks include:

1. Preprocessing/package validation.
2. Security tests.
3. Technical compliance/stability.
4. Content/policy compliance.
5. Usability/testability.
6. Store listing/age-rating correctness.

### EXE/MSI security/certification tests explicitly called out

Expect tests such as:
- Secure HTTPS package URL.
- URL points to .exe or .msi.
- Malware/unwanted-software scanning.
- Silent installation.
- Install under a standard user where applicable.
- Start-menu/Programs registration.
- Correct ProductName/Publisher/Language/Version metadata.
- Clean uninstall.
- Standalone/offline installer.
- Bundleware/third-party software check.
- Disclosure of non-Microsoft drivers/NT services where applicable.

The documentation recommends running Microsoft Defender or another compatible antivirus scan before submission and rebuilding from a clean environment if malware/unwanted-software scans fail.

### Testability rule

The certification team must be able to understand and test the app.

If the app has:
- Sign-in requirements.
- Locked features.
- Special test accounts.
- Background audio.
- Non-Microsoft drivers/services.
- Other non-obvious flows.

Provide accurate instructions/credentials in `Notes for certification` as appropriate.

If the app cannot be fully tested because of avoidable complexity, the PDF warns that this can contribute to failure.

## 16. Strong certification-failure avoidance checklist

Before submission the IDE agent should verify:

- App is actually finished.
- Build/package is from a clean, reproducible build.
- App has been tested on realistic supported hardware.
- Windows App Certification Kit has been run for MSIX when applicable.
- Antivirus/malware scan is clean.
- MSIX manifest identity is correct.
- EXE/MSI installer is fully offline.
- EXE/MSI installer binary will remain unchanged at its versioned URL.
- EXE/MSI is properly signed.
- Installer is silent and uninstalls cleanly.
- No unrelated third-party bundleware is installed.
- Non-Microsoft driver/NT service dependencies are disclosed.
- Privacy policy exists and is accessible if required.
- Description and metadata truthfully describe the actual product.
- App category is correct.
- Age rating questionnaire is accurate.
- Accessibility declaration is truthful.
- All test credentials/instructions are included in certification notes when necessary.
- Restricted capabilities are disclosed.
- Store screenshots/assets are valid and representative.
- Keywords are relevant and within limits.
- Market selection is legally appropriate.
- Monetization disclosures are accurate.
- No platform safety features are improperly disabled.

## 17. Microsoft Store Policy framework

The PDF includes `Microsoft Store Policies`, document version 7.19, with publish date September 10, 2025 and effective date October 14, 2025.

Major product-policy sections:
- 10.1 Distinct Function & Value; Accurate Representation
- 10.2 Security
- 10.3 Product is Testable
- 10.4 Usability
- 10.5 Personal Information
- 10.6 Capabilities
- 10.7 Localization
- 10.8 Financial Transactions
- 10.9 Notifications
- 10.10 Advertising Conduct and Content
- 10.13 Gaming and Xbox
- 10.14 Account Type

Major content-policy sections:
- 11.1 General Content Requirements
- 11.2 Names/Logos/Original and Third-Party Content
- 11.3 Risk of Harm
- 11.4 Defamatory/Libelous/Slanderous/Threatening
- 11.5 Offensive Content
- 11.6 Alcohol, Tobacco, Weapons and Drugs
- 11.7 Adult Content
- 11.8 Illegal Activity
- 11.9 Excessive Profanity and Inappropriate Content
- 11.10 Country/Region Specific Requirements
- 11.11 Age Ratings
- 11.12 User Generated Content
- 11.13 Third Party Digital Storefronts
- 11.14 Gambling Apps
- 11.15 Child Safety
- 11.16 Live Generative AI Content

### Most important 10.x principles for a normal desktop app

10.1:
- Product title/metadata must accurately represent the product.
- Product should provide distinct/meaningful value.
- Product name must be unique and not contain marketing/descriptive keyword stuffing.
- Use the most appropriate category/genre.
- Do not falsely claim affiliation with another company/entity.
- Web apps must be published by the domain/website owner.
- Search terms must be relevant and within limits.

10.2:
- Do not jeopardize device/user security.
- Do not disable platform safety/comfort features improperly.
- Web browsers must follow the specified browser-engine rules in the policy.
- Do not dynamically download and execute code in ways that fundamentally change functionality or violate policy.
- No malware/unwanted software.
- Do not install unrelated secondary software.
- Non-Microsoft driver/NT-service dependencies are generally disallowed or require case-by-case handling and disclosure.

10.3:
- Microsoft must be able to test the product.
- Locked/sign-in scenarios need usable certification instructions.

10.4:
- App must be functional on target systems.
- Prompt startup, responsiveness and graceful shutdown matter.
- If unsupported hardware/OS is used, app should detect incompatibility and explain requirements.

10.5:
- Personal Information handling requires legally sufficient consent and current privacy disclosures.
- Privacy policy must remain current as features evolve.
- Win32/Desktop Bridge examples are treated as inherently requiring privacy policies.
- Location-using products must provide settings to enable/disable location access as required.

10.8:
- Follow the correct Microsoft or allowed secure third-party payment mechanisms.
- Financial information as defined by the policy triggers the Company-account requirement.
- Transactions must be clear, authenticated and confirmed where third-party commerce is allowed.
- Credit-card processing through third parties must meet PCI DSS.
- Subscription value should not be removed from previous purchasers.

10.9 Notifications:
- Notifications are product content and therefore subject to Store policies.
- Do not disguise notification source.
- Do not include confidential/sensitive information.
- Notifications should relate to the product or another product you publish and should not be unrelated promotional spam.
- Respect Windows notification settings.

10.10 Advertising:
- The primary purpose of the app cannot simply be driving ad clicks.
- Advertising must not be deceptive.
- Respect Advertising ID settings.
- Ads must be distinguishable from ordinary product content.
- Privacy disclosures must explain relevant ad-service personal-information flows and opt-out requirements.

## 18. Content and user-generated content rules

### IP/third-party assets

Content and metadata must be:
- Created by the publisher, or
- Properly licensed, or
- Used with rights-holder permission, or
- Otherwise legally permitted.

This applies to:
- App icon
- Product title
- Description
- Screenshots
- Trailers
- Sounds/images/videos/text inside the app
- Notifications/error messages/ads
- Server-delivered content

### General content

Do not publish content that is:
- Defamatory/threatening.
- Pornographic/sexually explicit.
- Excessively or gratuitously profane.
- Illegal or encouraging illegal activity.
- Hate/discrimination/violence content prohibited by policy.
- Harmful or dangerous.

Country-specific restrictions can apply based on local laws/cultural norms.

### UGC

If the product contains user-generated content accessible by other users:
- Publish Terms of Service/content guidelines.
- Provide user reporting mechanisms and/or proactive detection.
- Remove/disable violating UGC when required.
- Handle moderation responsibilities inside the product/business model.

### Live Generative AI

If the product has dynamic generative-AI content:
- Disclose live generative AI use in metadata.
- Declare it in Partner Center during submission.
- Generated content must comply with Store Policies.
- Provide a way for users to report inappropriate generated content.

## 19. Post-publication updates

To release a new version:
1. Open the product in Partner Center.
2. Choose `Update` / create a new submission.
3. Change package(s) and/or metadata.
4. Save required sections.
5. Submit for certification.
6. After approval/publishing, the newer submission replaces the previous Store version.

Existing Store users normally receive updates automatically through the Store for Store-managed packages.

Metadata-only changes:
- A new package upload is not necessary if only listing data such as description or screenshots changes.
- However, the metadata change still goes through certification.

Package management:
- Multiple architectures can be supplied.
- For MSI/EXE, only one package per architecture + language combination is allowed in the submission according to the package-management guidance.

## 20. Gradual rollout / flighting / beta distribution

### Gradual rollout

MSIX supports gradual rollout for updates.
- Enable gradual rollout during the update submission.
- Example initial percentage in the docs: 5%.
- Increase percentage after monitoring.
- Halt rollout if problems appear.
- Halting stops additional distribution but does not revert users who already received the update.
- Setting 100% does not guarantee every user immediately receives the package; finalizing the rollout may be necessary to stop distributing older packages to all eligible users.

### Package flighting

MSIX supports package flighting; the PDF describes this as a beta/pre-release mechanism for controlled testers.

### Private audience

Use private audience when the app/listing should be restricted to selected people.

EXE/MSI does not have the same private-app/package-flighting advantages.

## 21. Removing/unpublishing an app

From App Overview/Store presence:
- You can make an app unavailable without creating a new submission.
- It can take a few hours for Store visibility to disappear.
- New customers cannot acquire it while unavailable.
- Existing customers can keep using it and can redownload it; later updates may still be delivered to existing users.
- The product remains visible to the developer in Partner Center.
- It can later be made available again, subject to the latest visibility configuration.

## 22. Submission controls

Draft management for MSIX:
- You can delete a draft submission if not submitted/live.
- You can cancel certification from the certification status card.

EXE/MSI has similar draft/review cancellation controls.

Cancelling certification returns the submission to draft after the cancellation is processed.

## 23. Analytics after publishing

Partner Center provides analytics for:
- Acquisitions/installs.
- Usage/engagement.
- Health and crashes.
- Ratings and reviews.
- Add-on acquisitions.
- Meaningful Insights/changes and trends.

Reports described:
- Acquisitions report.
- Add-on acquisition report.
- Usage report.
- Health report.
- Reviews report.
- Insights report.

Filtering/export:
- Market.
- Date.
- Device/platform and other dimensions.
- CSV/TSV export.
- API access can integrate data into custom dashboards.

Newer analytics experience in the PDF:
- Recent data views can show last 24/48 hours for acquisitions.
- Usage Recent Data includes hourly active devices/users and engagement-duration metrics.
- Recent telemetry may be partial and not yet final.

## 24. Promotions and Store growth

Partner Center supports:
- Store listing/product-page experimentation.
- Promotional campaigns.
- Targeted offers/customer groups.
- Promotional codes.
- Package flighting/beta distribution.
- Web installer distribution for supported scenarios.

Promotional-code guidance in the PDF:
- Codes can be used for influencer access, customer-service remediation, or beta testing.
- Games: up to 5,000 promotional codes; the PDF says game codes do not expire.
- Other apps/add-ons: up to 1,600 single-use codes in a six-month period, or multiple-use codes with total redemptions capped at 1,600 over the same period.
- Subscription add-ons are excluded from promotional codes.

## 25. Enterprise/private distribution

The PDF describes enterprise scenarios including:
- Microsoft Intune.
- Line-of-business licensing.
- Online and offline licenses.
- Microsoft Configuration Manager.
- App Installer.
- Sideloading.
- Private Store association.

App Installer can install MSIX directly or via `.appinstaller` from a web server in supported enterprise scenarios.

Note from the PDF:
- `ms-appinstaller:` one-click browser installation is disabled by default since December 2023; enterprises can re-enable it with Group Policy.

## 26. Partner Center users and permissions

Partner Center supports team users, groups and Microsoft Entra applications.

Roles include concepts such as:
- Account owner.
- Manager.
- Developer.
- Business contributor.
- Finance contributor.
- Marketer.

The PDF also describes custom account-level and product-level permissions.

Important EXE/MSI exception:
- The PDF states that the normal Partner Center user roles/permissions do not currently apply to EXE/MSI apps in the same way; all users added to the developer account can submit/modify EXE/MSI apps.

Microsoft Entra applications can be added to the Partner Center account to enable API automation. Treat client secrets/certificates as sensitive credentials.

## 27. Microsoft Store Submission API

The PDF describes programmatic Store submission APIs.

For MSI/EXE specifically:
- API uses Microsoft Entra ID authentication.
- Organization needs an Entra ID directory.
- Global administrator permission is required to complete certain prerequisites.
- Associate an Entra application with Partner Center.
- Collect tenant ID, client ID and a key/client secret/certificate.
- Access token lifetime described in the PDF: 60 minutes.
- You cannot create the initial Partner Center product purely through this API; first reserve/create the app in Partner Center.
- For automated recurring submissions, the first submission for the product must be created in Partner Center, including age-rating setup.

## 28. Microsoft Store Developer CLI

The PDF describes the Microsoft Store Developer CLI as a cross-platform tool for automating Store workflows.

Supported platforms described:
- Windows 10+.
- macOS.
- Linux.

Major capabilities/commands:
- `info` — show current configuration.
- `reconfigure` — configure Partner Center/Entra credentials.
- `settings` — manage CLI settings.
- `apps` — list/retrieve app information.
- `submission` — status/get/update metadata/update/poll/publish/delete/rollout and related submission operations.
- `init` — initialize Store publishing configuration.
- `package` — package application as MSIX.
- `publish` — publish app.
- `flights` — manage flights.

Authentication warning:
- The PDF explicitly says NOT to use an MSA for CLI sign-in; the Store Developer CLI requires Microsoft Entra ID credentials.

Runtime/installation guidance in the PDF differs by command/article version:
- MSIX CLI guidance mentions .NET 9 Desktop Runtime.
- MSI/EXE CLI guidance mentions .NET 8 Desktop Runtime.
- Install via winget in Windows examples.

Typical MSIX setup pattern:
```text
msstore reconfigure --tenantId <TENANT_ID> --sellerId <SELLER_ID> --clientId <CLIENT_ID> --clientSecret <CLIENT_SECRET>
```

Do NOT hardcode or commit those values.

## 29. CI/CD automation

The PDF shows Azure DevOps and GitHub Actions examples.

Credential rules:
- Store tenant ID, seller ID, client ID and client secret/certificate as CI/CD secrets.
- Do not print them in logs.
- GitHub Actions uses encrypted secrets.
- Azure DevOps uses secret variables.

The PDF describes automation for:
- Building.
- Testing.
- Configuring Store CLI.
- Submitting packages.
- Publishing updates.
- Gradual rollout.

Important current-doc limitation in the PDF:
- App update operations through the Store Developer CLI/GitHub Actions were described as supported for free products only; paid-product support was stated as future work in those article versions.

The agent must verify this limitation against current live documentation before building an automated paid-product pipeline.

## 30. Financial/earnings/account maintenance

Partner Center includes:
- Earnings workspace.
- Tax/account information.
- Bank/payment details where applicable.
- Payout status.

The PDF states:
- Microsoft validates account/payment data.
- Payout status can show `Action required` until data is confirmed.
- Developer payouts are typically issued monthly assuming the minimum threshold is met.
- Changes to bank/tax information should be updated promptly to avoid interruptions.

The supplied PDF excerpt does not provide a single universal payout-threshold value, so the agent must NOT invent one.

## 31. Support contacts from the PDF

General Partner Center/app submission/certification/analytics support:
- Use Partner Center Help (`?`) → `Contact Support` → support ticket.

Certification-related contact mentioned:
- `reportapp@microsoft.com`

New onboarding support mentioned for the new individual/company onboarding flows:
- `storesupport@service.microsoft.com`

Treat support addresses as source-derived and verify current live contact channels before use in an actual incident.

## 32. Migration from web EXE/MSI to Store MSIX

If an app already exists as an unpackaged web EXE/MSI and a Store-packaged MSIX version is introduced, the PDF gives a migration strategy.

Possible automatic migration flow:
1. Preserve existing taskbar/Start-menu pins so they continue to work.
2. Download/install the Store package silently from the existing web version.
3. Notify the user that a restart is needed.
4. Launch the Store version and close the old unpackaged version.
5. Migrate data to the Store package's new app-data folder.
6. Programmatically uninstall the old unpackaged version.

For users who installed both versions:
- Store version can detect/uninstall the unpackaged version.
- Unpackaged launch can redirect to the Store version.
- Data migration can be performed if needed.
- Conflicts and synchronization must be handled if both versions remain side-by-side.

The Store product's 12-character Store ID can be found in Partner Center under Product Identity and can be used by the app-install APIs for Store-package installation scenarios.

## 33. AI agent operating rules

The IDE agent should follow these rules whenever working on Microsoft Store publishing:

### Rule A — Determine account type first
Never assume Individual or Company. Inspect the account state/configuration before designing monetization or account-dependent features.

### Rule B — Prefer MSIX for a normal desktop app
Use MSIX as the default Store packaging path unless a concrete project requirement makes EXE/MSI preferable.

### Rule C — Never invent Store IDs or identity values
Read the actual Product Identity / Partner Center app identity values. Manifest identity is case-sensitive.

### Rule D — Never expose secrets
Tenant ID, seller ID, client ID, client secret, certificate files/passwords and similar automation credentials must be stored only in secure secret stores/CI variables.

### Rule E — Build for Store certification, not just local launch
The release pipeline must include package validation, clean install, silent install where applicable, uninstall verification, malware scan, supported-OS/hardware checks, and Store metadata correctness.

### Rule F — Keep submitted binaries immutable
Never replace a submitted EXE/MSI at the same URL. Use versioned URLs for each new binary.

### Rule G — Certification notes are part of the release contract
Any feature requiring credentials, special steps, drivers, services or background behavior must have clear tester instructions.

### Rule H — Treat privacy and financial-information rules as architecture constraints
If a feature starts collecting personal or financial information, stop and re-check Store policy/account requirements before implementation.

### Rule I — Metadata must match the actual app
Title, description, screenshots, category, search terms, age rating and feature descriptions must accurately reflect the shipping product.

### Rule J — Do not mark accessibility or compliance claims casually
Only declare capabilities/features that have actually been implemented and tested.

### Rule K — Update path is a new certified submission
Any new binary, price, description, screenshots or significant Store metadata change should be treated as a submission/update workflow, not an ad-hoc Store edit.

### Rule L — Use private audience/flight/rollout deliberately
Use Private audience or flights for controlled testing. Use gradual rollout for risk-managed MSIX updates. Do not confuse direct-link-only discoverability with true private beta distribution.

## 34. Recommended release pipeline for a desktop app

A practical workflow derived from the PDF:

1. Develop normally.
2. Decide Store account type and confirm it permits the app's business/financial model.
3. Reserve the Store name early.
4. Generate MSIX/AppX package(s) for target architectures.
5. Prefer `.msixupload`/`.appxupload` when supported by the build tool for Store submission.
6. Include public symbols where crash analytics matter.
7. Verify manifest identity against Partner Center.
8. Run local installation/uninstallation tests.
9. Run Windows App Certification Kit where applicable.
10. Run antivirus/malware checks.
11. Verify privacy policy/support pages.
12. Prepare Store screenshots and assets.
13. Prepare accurate description, feature list and keywords.
14. Complete pricing/markets/visibility/age rating.
15. Add certification notes for any special test path.
16. Validate package in Partner Center.
17. Submit for certification.
18. Monitor certification state and resolve errors.
19. Publish immediately or release according to schedule/hold.
20. Monitor acquisitions, crashes, usage, reviews and insights.
21. For a new release, create an update submission.
22. Use gradual rollout for higher-risk MSIX updates where appropriate.
23. Finalize rollout after observing health.

## 35. Information the IDE agent should keep as project configuration

The agent should maintain a secure/non-secret Store publishing configuration containing:

```yaml
microsoft_store:
  account:
    type: "Individual | Company"
    country_region: "<must match Partner Center; cannot be changed later>"
    publisher_display_name: "<customer-visible publisher name>"
    onboarding_status: "<verified/pending/etc>"

  product:
    product_name: "<reserved Store name>"
    product_id: "<Partner Center Product Identity value>"
    store_id: "<12-character Store ID if applicable>"

  packaging:
    preferred: "MSIX"
    architectures: ["x64", "x86", "arm64"]
    submission_file: "<msixupload/appxupload/etc>"

  listing:
    default_language: "<language>"
    description: "<source of truth>"
    short_description: "<source of truth>"
    screenshots: []
    logo_assets: []
    keywords: []
    privacy_policy_url: "<url>"
    support_url: "<url>"

  release:
    pricing_model: "<Free/Freemium/Subscription/Paid>"
    markets: []
    visibility: "<Public/Private/direct-link/etc>"
    release_mode: "<immediate/scheduled/hold>"
    gradual_rollout: false

  compliance:
    age_rating_complete: false
    privacy_policy_verified: false
    certification_notes_ready: false
    accessibility_declared: false
    restricted_capabilities: []
    non_microsoft_driver_dependencies: []

  automation:
    cli_enabled: false
    ci_cd_enabled: false
    tenant_id_secret_name: "PARTNER_CENTER_TENANT_ID"
    seller_id_secret_name: "PARTNER_CENTER_SELLER_ID"
    client_id_secret_name: "PARTNER_CENTER_CLIENT_ID"
    credential_secret_name: "PARTNER_CENTER_CLIENT_SECRET_OR_CERT"
```

Do not store actual client secrets/certificate passwords in this document.

## 36. Source page map from the supplied 830-page PDF

The most relevant publishing sections are concentrated here:

- Pages 3–18: Store publishing overview, account, submission, certification, analytics, benefits, revenue, signing.
- Pages 19–22: Individual developer account onboarding.
- Pages 23–25: Win32 distribution options and EXE/MSI requirements.
- Pages 26–33: Web-unpackaged → Store-packaged migration, Store ID/install APIs.
- Pages 34–37: App name reservation and naming rules.
- Pages 38–43: Create a Store submission.
- Pages 44–77: MSIX pricing, markets, visibility, price, schedule.
- Pages 78–98: Properties, categories, privacy/support, declarations, hardware, age ratings.
- Pages 99–116: MSIX package requirements/upload.
- Pages 117–147: MSIX Store listings, assets, additional information, import/export, submission options.
- Pages 149–225: EXE/MSI name, submission, pricing, properties, privacy/support, declarations, age ratings, package rules, installer handling, listing, CSV import, submission controls.
- Pages 226–400: PWA/add-on and additional Store publishing flows.
- Pages 401–499: Analytics/reports, Store growth and engagement features.
- Pages 500–529: Beta testing, package flights, gradual rollout and enterprise distribution.
- Pages 530–620: Microsoft Store submission API and related automation endpoints.
- Pages 621–649: Microsoft Store Developer CLI and CI/CD.
- Pages 650–704: Partner Center user management, roles, permissions, workspaces, account settings, earnings/payout information.
- Pages 705–800: Microsoft Store technical/content policies and certification guidance.
- Pages 801–816: Updated company onboarding and new publishing/navigation changes.
- Pages 817–830: Newer analytics `Recent data` and renewed individual onboarding information.

## 37. Final “do not forget” list

1. Partner Center developer account is mandatory for Store publishing.
2. Country/region cannot be changed later.
3. New Individual and Company onboarding flows described in this PDF waive the old registration fees.
4. Individual uses personal MSA; Company can use MSA or Entra ID.
5. Reserve the unique Store name before the first submission.
6. MSIX is the recommended packaging path.
7. MSIX Store submissions do not need your own CA-trusted signing certificate.
8. EXE/MSI Store submissions do need a CA-trusted signature and a versioned HTTPS installer URL.
9. EXE/MSI installer must be standalone/offline and silent.
10. Do not mutate a submitted binary at its URL.
11. Submit a new versioned binary URL for every EXE/MSI update.
12. At least one screenshot is required; 4+ is recommended, with 5–8 per device type suggested in one FAQ.
13. Keep Store copy truthful and within character limits.
14. Keywords: max 7, max 40 chars each, max 21 unique words overall.
15. Privacy policy requirements are serious, especially for Win32/Desktop Bridge apps.
16. Financial-information requirements can force a Company account.
17. Certification can take up to about 3 business days.
18. Passing certification is not the end: Microsoft may perform post-publication spot checks.
19. Published MSIX updates can use gradual rollout.
20. Analytics should be monitored after launch, especially health/crashes, usage and reviews.
21. CI/CD secrets must never be hardcoded or logged.
22. The live Microsoft Store policies and Partner Center UI take precedence over stale copies of this PDF when Microsoft has changed a requirement.
