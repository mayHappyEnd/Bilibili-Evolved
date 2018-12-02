(() =>
{
    return (settings, resources) =>
    {
        const CompareResult = {
            less: -1,
            equal: 0,
            greater: 1,
            incomparable: NaN
        };
        // Based on http://jsfiddle.net/ripper234/Xv9WL/28/
        class Version
        {
            constructor(versionString)
            {
                this.parts = versionString.split('.').map(it => parseInt(it));
                this.versionString = versionString;
            }
            compareTo(other)
            {
                for (let i = 0; i < this.parts.length; ++i)
                {
                    if (other.parts.length === i)
                    {
                        return CompareResult.greater;
                    }
                    if (this.parts[i] === other.parts[i])
                    {
                        continue;
                    }
                    if (this.parts[i] > other.parts[i])
                    {
                        return CompareResult.greater;
                    }
                    return CompareResult.less;
                }
                if (this.parts.length !== other.parts.length)
                {
                    return CompareResult.less;
                }
                return CompareResult.equal;
            }
            greaterThan(other)
            {
                return this.compareTo(other) === CompareResult.greater;
            }
            lessThan(other)
            {
                return this.compareTo(other) === CompareResult.less;
            }
            equals(other)
            {
                return this.compareTo(other) === CompareResult.equal;
            }
        }

        const latestVersion = new Version(resources.data.latestVersion.text);
        const currentVersion = new Version(settings.currentVersion);
        if (latestVersion.greaterThan(currentVersion))
        {
            return {
                settingsWidget: {
                    after: () => $(".gui-settings-content"),
                    content: `<div class="gui-settings-footer${(settings.blurSettingsPanel ? " blur" : "")}">
                            <span class="gui-settings-label">新版本${latestVersion.versionString}已发布.</span>
                            <a href="${settings.latestVersionLink}">
                                <button
                                    class="gui-settings-button"
                                    id="new-version-update">
                                    安装
                                </button>
                            </a>
                            <a target="blank"  href="https://github.com/the1812/Bilibili-Evolved/releases">
                                <button
                                    class="gui-settings-button">
                                    查看
                                </button>
                            </a>
                        </div>`,
                    success: () =>
                    {
                        const message = `新版本${latestVersion.versionString}已发布.  <a class="link" href="${settings.latestVersionLink}">安装</a><a class="link" target="_blank"   href="https://github.com/the1812/Bilibili-Evolved/releases">查看</a>`;
                        Toast.info(message, "检查更新");
                    }
                },
                widget:
                {
                    content: `
                        <button
                            class="gui-settings-flat-button"
                            id="new-version-update">
                            <a href="${settings.latestVersionLink}">
                                <i class="icon-update"></i>
                                <span>安装更新</span>
                            </a>
                        </button>
                        <button
                            class="gui-settings-flat-button"
                            id="new-version-info">
                            <a target="blank" href="https://github.com/the1812/Bilibili-Evolved/releases">
                                <i class="icon-info"></i>
                                <span>查看更新</span>
                            </a>
                        </button>
                    `,
                    success: () =>
                    {
                        const message = `新版本${latestVersion.versionString}已发布.  <a class="link" href="${settings.latestVersionLink}">安装</a><a class="link" target="_blank"   href="https://github.com/the1812/Bilibili-Evolved/releases">查看</a>`;
                        Toast.info(message, "检查更新");
                    },
                },
            };
        }
    };
})();
