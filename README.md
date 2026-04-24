# ai-toolkit

A starter set of custom [Claude Code](https://claude.ai/code) skills installable via npm. Skills extend Claude Code with slash commands (`/skill-name`) that trigger specialized AI behaviors directly in your CLI session.

## Installation

From the project directory:

```bash
npm install -g .
```

Skills are automatically copied to `~/.claude/skills/` on install. Open Claude Code and type `/` to see all available commands.

## Manual Management

```bash
ai-toolkit install      # Copy skills to ~/.claude/skills/
ai-toolkit uninstall    # Remove package skills from ~/.claude/skills/
ai-toolkit list         # List available skills with descriptions
ai-toolkit --help       # Show usage
```

## Included Skills

| Skill | Description |
|-------|-------------|
| `/baseline-ui` | Validates animation durations, enforces typography scale, checks component accessibility, and prevents layout anti-patterns in Tailwind CSS projects |
| `/brainstorming` | Explores user intent, requirements, and design before implementation — use before any creative or feature work |
| `/ckm-banner-design` | Design banners for social media, ads, website heroes, and print with multiple art direction options |
| `/ckm-brand` | Brand voice, visual identity, messaging frameworks, asset management, and brand consistency |
| `/ckm-design` | Comprehensive design skill: brand identity, design tokens, UI styling, logo generation, and corporate identity |
| `/ckm-design-system` | Token architecture (primitive→semantic→component), CSS variables, spacing/typography scales, and component specs |
| `/ckm-slides` | Create strategic HTML presentations with Chart.js, design tokens, and responsive layouts |
| `/ckm-ui-styling` | Build accessible UIs with shadcn/ui, Radix UI, and Tailwind — includes dark mode, dialogs, forms, and tables |
| `/code-review-expert` | Expert code review with a senior engineer lens — detects SOLID violations, security risks, and proposes improvements |
| `/fixing-accessibility` | Audit and fix ARIA labels, keyboard navigation, focus management, color contrast, and form errors |
| `/fixing-metadata` | Audit and fix page titles, meta descriptions, Open Graph tags, Twitter cards, and JSON-LD structured data |
| `/fixing-motion-performance` | Audit and fix animation performance: layout thrashing, compositor properties, and scroll-linked motion |
| `/frontend-design` | Create distinctive, production-grade frontend interfaces — avoids generic AI aesthetics |
| `/seo-audit` | Full SEO audit: technical SEO, Core Web Vitals, crawl errors, on-page issues, and indexing diagnostics |
| `/skill-creator` | Create, modify, and benchmark Claude Code skills with variance analysis and description optimization |
| `/ui-ux-pro-max` | UI/UX intelligence across 10 stacks with 50+ styles, 161 palettes, 57 font pairings, and 99 UX guidelines |
| `/vercel-react-best-practices` | React and Next.js performance optimization guidelines from Vercel Engineering |
| `/web-design-guidelines` | Review UI code for Web Interface Guidelines compliance — accessibility, UX, and design best practices |

## How Skills Work

Each skill lives in `skills/<name>/` and contains a `SKILL.md` file with frontmatter metadata and a prompt that Claude Code loads when you invoke the command. Skills are copied to `~/.claude/skills/` so Claude Code can discover them.

## Requirements

- Node.js >= 16
- [Claude Code](https://claude.ai/code) CLI installed

## License

MIT
