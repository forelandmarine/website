# Email signatures

Source HTML and Apple Mail builds for Foreland Marine signatures.

`henry-ebdell.html` follows the same structure as Jack's signature: the lighthouse
panel on the left with a hairline divider, then name and title in navy (#033269),
the contact block, the Instagram icon, and the confidentiality note under a grey
rule. All icons are the shared files already hosted at
`https://www.forelandmarine.com/sig/`, so nothing new needs deploying.

The block width is set to the measured width of the content (502px with the
lighthouse panel, 341px without) so the grey rule runs flush with the longest
line. Henry's title is longer than Jack's, which is why the number differs.

`henry-ebdell-no-headshot.html` is the same signature laid out like Dan's, with
no lighthouse panel.

Images are referenced by https URL rather than embedded as `cid:` parts, because
Apple Mail strips inline image parts from hand-built signatures on send.

## Installing in Apple Mail

Create a signature of the same name in Mail, quit Mail, then overwrite the
generated `.mailsignature` file in
`~/Library/Mail/V10/MailData/Signatures/` with `henry-ebdell.mailsignature`,
keeping the two header lines at the top of the file. Run `chflags uchg` on the
file so Mail cannot rewrite it, then relaunch Mail.

## Outstanding

Add Henry's LinkedIn URL and a LinkedIn icon alongside the Instagram one, as
Jack's and Dan's signatures carry.
