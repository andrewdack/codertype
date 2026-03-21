export default function PrivacyPage() {
    return (
        <div className="flex-1 flex flex-col">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1">
                <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p>
                        This privacy policy explains how codertype collects, uses, and protects your information.
                    </p>

                    <h2>Information We Collect</h2>
                    <p>
                        Currently, codertype:
                    </p>
                    <ul>
                        <li>Does not require user accounts</li>
                        <li>Does not store personal information</li>
                        <li>May collect anonymous usage analytics in the future</li>
                    </ul>

                    <h2>How We Use Information</h2>
                    <p>
                        Any information we collect is used solely to:
                    </p>
                    <ul>
                        <li>Improve the typing test experience</li>
                        <li>Fix bugs and technical issues</li>
                        <li>Understand how users interact with our service</li>
                    </ul>

                    <h2>Data Storage</h2>
                    <p>
                        Your typing test results are stored locally in your browser and are not transmitted to our servers.
                    </p>

                    <h2>Changes to This Policy</h2>
                    <p>
                        We may update this privacy policy from time to time. We will notify users of any material changes.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have questions about this privacy policy, please contact us at dackcodes@gmail.com.
                    </p>
                </div>
            </div>
        </div>
    );
}