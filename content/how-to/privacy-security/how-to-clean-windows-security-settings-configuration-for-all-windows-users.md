---
title: "How to clean Windows security settings configuration for All Windows Users?"
date: "2025-07-11"
author: "Nova"
categories: 
  - "privacy-security"
---

Windows Security settings play a crucial role in protecting your PC from threats, safeguarding personal data, and ensuring smooth operation. Over time, these settings can become cluttered or misconfigured due to software changes, user modifications, or system updates. Cleaning up your Windows security settings is essential for both privacy and system performance. This article explains, step-by-step, how to review, reset, and optimize Windows security configurations for all users, with tailored instructions for both beginners and advanced users.

Why Clean Windows Security Settings?

Security settings directly impact the protection of your files, user data, and network safety. Misconfigured or outdated settings can expose your system to risks, cause unnecessary prompts, or reduce usability. Cleaning these settings ensures that the PC runs efficiently while maintaining strong security.

Section 1: For Beginners – Basic Windows Security Cleanup

What are the recommended steps to review and reset basic Windows security settings?

1\. Check and Reset Windows Defender Settings

\- Go to Start > Settings > Privacy & Security > Windows Security. - Open "Virus & threat protection" and click "Manage settings." - Make sure Real-time protection, Cloud-delivered protection, and Automatic sample submission are all enabled. - If you suspect settings have been tampered with, scroll down and click "Restore settings to their default values."

2\. Review and Clean Up Account Permissions

\- Open Settings > Accounts > Family & Other Users. - Remove any unknown or unnecessary accounts. - Ensure your main account is set as a Standard or Administrator account as appropriate.

3\. Clean Unused or Risky Apps

\- Go to Settings > Apps > Installed apps. - Uninstall any suspicious or unused programs, especially those you do not recognize.

4\. Use Glary Utilities for Automated Privacy Cleanup

Glary Utilities provides a user-friendly interface to manage privacy and security:

\- Download and install [Glary Utilities](https://www.glarysoft.com). - Open the program and choose "1-Click Maintenance." - Check items like "Spyware Remover," "Tracks Eraser," and "Registry Cleaner" to clear out privacy traces and fix registry issues. - Click "Scan for Issues," then "Repair Problems" to clean up your system.

Section 2: For Advanced Users – Deep Security Configuration Cleaning

How can advanced users thoroughly clean and optimize Windows security settings?

1\. Reset Group Policy Settings

Group Policy changes can create hidden vulnerabilities.

\- Open Command Prompt as Administrator. - Enter: RD /S /Q "%windir%\\System32\\GroupPolicy" RD /S /Q "%windir%\\System32\\GroupPolicyUsers" - Reboot the PC. This will remove all custom Group Policy settings, restoring them to default.

2\. Clean Security Policies and Audit Settings

\- Press Win+R, type secpol.msc, and press Enter. - Review Local Policies (e.g., User Rights Assignment, Security Options). - If you find unknown entries, right-click and choose "Properties" > "Restore Default" where available.

3\. Remove Old Credentials and Certificates

\- Open Control Panel > User Accounts > Credential Manager. - Remove any stored credentials that are unused or suspicious. - For certificates, go to Run > certmgr.msc, and review certificates under "Personal" and "Trusted Root Certification Authorities." Remove any you do not recognize.

4\. Review Windows Firewall Rules

\- Go to Control Panel > System and Security > Windows Defender Firewall > Advanced settings. - In "Inbound Rules" and "Outbound Rules," disable or delete any rules for applications you no longer use, or that appear suspicious.

5\. Harden PowerShell and Script Execution Policies

\- Open PowerShell as Administrator. - Run: Get-ExecutionPolicy (to check current policy) - To reset: Set-ExecutionPolicy Default

6\. Use Glary Utilities Advanced Tools

Glary Utilities offers advanced privacy tools for experienced users:

\- Launch [Glary Utilities](https://www.glarysoft.com), navigate to the "Privacy & Security" tab. - Use the "Tracks Eraser" to remove traces of system and internet activity. - Access "File Shredder" to securely delete sensitive files. - Schedule regular scans to maintain a clean privacy profile.

Section 3: Real-World Example – Cleaning Up After a Suspected Breach

Scenario: You suspect a malware infection changed your security settings.

\- Run Windows Defender Full Scan to remove threats. - Use Glary Utilities "1-Click Maintenance" to remove residual malware traces and repair registry changes. - Reset Windows Firewall and Group Policy to default using the steps above. - Check all user accounts, credentials, and certificates for unauthorized changes. - Review installed programs for suspicious additions, removing as needed.

Best Practices for Ongoing Security Hygiene

\- Regularly review security and privacy settings. - Use Glary Utilities for scheduled maintenance to remove traces and optimize security. - Keep Windows and all security tools updated. - Limit the number of administrator accounts. - Enable "Controlled folder access" for ransomware protection (Windows Security > Virus & threat protection > Manage ransomware protection).

Conclusion

Cleaning up Windows security settings is essential for both privacy and overall system health. Beginners can use built-in tools and [Glary Utilities](https://www.glarysoft.com) for safe, automated cleaning. Advanced users have more granular options to reset and harden configurations. With regular maintenance and vigilance, you can ensure your PC remains protected and performs optimally for all users.
