---
title: "issue with duitnow qr"
date: "2024-12-15"
preview: "Encountered an interesting problem with DuitNow QR payments recently..."
---

# Issues with DuitNow QR

Recently encountered some interesting problems with DuitNow QR payments that took a while to debug.

The main issue was with QR code generation and validation for dynamic payment amounts. The system would occasionally reject valid payments or generate incorrect QR codes when dealing with decimal values.

After digging into the documentation and some testing, found that it was related to how the backend was formatting currency values - it was using comma as decimal separator in some places and period in others.

Fixed by standardizing all currency formatting to use period as decimal separator and ensuring all amount values are properly rounded to 2 decimal places before generating QR codes. 