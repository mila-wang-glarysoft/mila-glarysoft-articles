---
title: "All's Guide to Windows Diagnostic Utilities Management in Windows"
date: "2025-08-15"
author: "Riley"
categories: 
  - "system-tools"
---

Advanced Windows users often rely on built-in diagnostic utilities to pinpoint system issues, verify hardware status, and optimize performance. A structured approach to managing these tools helps ensure accurate troubleshooting and minimal downtime. This guide walks through the most effective diagnostic utilities in Windows, complete with step-by-step instructions and practical examples for advanced-level use.

What is the Windows Performance Monitor and how to use it?

Performance Monitor (perfmon.exe) is a powerful tool for real-time and historical performance tracking. It allows you to create custom views, log sessions, and data collector sets to monitor CPU, memory, disk, and network usage over time.

Step-by-step example: Creating a custom data collector set 1. Press Win + R, type perfmon, and press Enter. 2. In the left panel, expand Data Collector Sets and right-click User Defined. 3. Select New > Data Collector Set. 4. Name it (e.g., "CPU-Disk-Network Analysis") and choose Create manually (Advanced). 5. Add performance counters such as Processor(\_Total)\\% Processor Time, PhysicalDisk(\_Total)\\Avg. Disk Queue Length, and Network Interface\\Bytes Total/sec. 6. Set the log file location to a dedicated diagnostics folder on your drive. 7. Start the data collector set and let it run during the period you want to monitor. 8. Review the results with Performance Monitor’s graph view or export for analysis in Excel.

How does Resource Monitor help in pinpointing bottlenecks?

Resource Monitor (resmon.exe) provides a deep live view into CPU, memory, disk, and network activity, including per-process breakdowns.

Step-by-step example: Isolating a process causing high disk usage 1. Press Ctrl + Shift + Esc to open Task Manager and click Open Resource Monitor from the Performance tab. 2. Switch to the Disk tab. 3. Sort by Total (B/sec) to see which process is reading/writing the most. 4. Expand the process to see the exact files being accessed. 5. Cross-reference the file path to determine if it’s a legitimate process or a background task causing slowdown.

How can you check hardware health with Windows Memory Diagnostic?

Windows Memory Diagnostic is a straightforward utility to test RAM for errors.

Step-by-step example: Running a memory scan 1. Press Win + R, type mdsched.exe, and press Enter. 2. Choose Restart now and check for problems. 3. The system will reboot and run multiple passes. 4. Once complete, results will be shown after login or can be retrieved in Event Viewer under Windows Logs > System with source "MemoryDiagnostics-Results".

When should you use Event Viewer for diagnostics?

Event Viewer allows you to analyze detailed logs for applications, security, and system events. For advanced troubleshooting, it’s invaluable when identifying the root cause of crashes or errors.

Step-by-step example: Investigating a system crash 1. Press Win + X and select Event Viewer. 2. Navigate to Windows Logs > System. 3. Filter Current Log and select Critical and Error events. 4. Look for events with source “BugCheck” or “EventLog” around the crash time. 5. Double-click the event to read the detailed description and note the error codes for further analysis.

How can [Glary Utilities](https://www.glarysoft.com) complement Windows diagnostic tools?

While Windows offers strong built-in diagnostics, Glary Utilities provides a unified interface for system optimization, maintenance, and additional diagnostics.

Advanced example: Running an integrated system health check with [Glary Utilities](https://www.glarysoft.com) 1. Launch Glary Utilities and go to the 1-Click Maintenance module. 2. Select items like Registry Cleaner, Temporary Files Cleaner, Startup Manager, and Shortcuts Fixer. 3. Run the scan and review the detailed report for system issues. 4. Use the Advanced Tools section to access Disk Repair, Process Manager, and System Information for deeper analysis. 5. Combine this with Windows’ built-in utilities to both identify and resolve performance bottlenecks in one workflow.

By mastering both Windows’ native diagnostic utilities and leveraging all-in-one optimization tools like [Glary Utilities](https://www.glarysoft.com), advanced users can maintain peak system performance while having immediate access to in-depth troubleshooting data. This dual approach ensures faster problem resolution and a more controlled computing environment.
