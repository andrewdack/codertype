export default function SecurityPage() {
    return (
        <div className="flex-1 flex flex-col">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1">
                <h1 className="text-3xl font-bold mb-8">Security Policy</h1>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p>
                        Security is important to us at codertype. This page outlines our security practices and how to report issues.
                    </p>

                    <h2>Reporting Security Vulnerabilities</h2>
                    <p>
                        If you discover a security vulnerability, please report it responsibly:
                    </p>
                    <ul>
                        <li>Email us at dackcodes@gmail.com</li>
                        <li>Include detailed information about the vulnerability</li>
                        <li>Do not publicly disclose the issue until we've had a chance to address it</li>
                    </ul>

                    <h2>Data Protection</h2>
                    <p>
                        We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <h2>Secure Development</h2>
                    <p>
                        Our development practices include:
                    </p>
                    <ul>
                        <li>Regular security reviews of code</li>
                        <li>Dependency scanning for known vulnerabilities</li>
                        <li>Secure coding practices</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}