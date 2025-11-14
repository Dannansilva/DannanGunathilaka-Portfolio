# Projects Components

This folder contains all project-related components for the portfolio website.

## Structure

- `ProjectCard.tsx` - Reusable project card component
- `SoftwareProjects.tsx` - Software engineering projects (with project data)
- `ContentProjects.tsx` - Content creation projects (with project data)

## How to Add New Projects

### Adding a Software Engineering Project

1. Open `components/projects/SoftwareProjects.tsx`
2. Add a new project object to the `softwareProjects` array:

```typescript
{
  icon: '🚀',  // Emoji icon for the project
  title: 'Your Project Title',
  category: 'PROJECT CATEGORY',  // e.g., 'WEB APPLICATION', 'MOBILE DEVELOPMENT', 'ERP SOLUTION'
  description: 'Brief description of your project and its key features.',
  tags: ['Tech1', 'Tech2', 'Tech3', 'Tech4'],  // Technologies used
  link: '#',  // Link to project details or demo
  hasDetails: true  // Optional: Set to true to show "View Details" link
}
```

### Adding a Content Creation Project

1. Open `components/projects/ContentProjects.tsx`
2. Add a new project object to the `contentProjects` array:

```typescript
{
  icon: '📹',  // Emoji icon for the content
  title: 'Your Content Title',
  category: 'CONTENT TYPE',  // e.g., 'VIDEO COURSE', 'BLOG', 'PODCAST', 'EBOOK'
  description: 'Brief description of your content and what it covers.',
  tags: ['Topic1', 'Topic2', 'Platform', 'Type'],
  link: '#',  // Link to the content
  hasDetails: true  // Optional: Set to true to show "View Details" link
}
```

## Project Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `icon` | string | Yes | Emoji or icon to display |
| `title` | string | Yes | Project/content title |
| `category` | string | Yes | Category label (shown in blue) |
| `description` | string | Yes | Brief description (max 3 lines) |
| `tags` | string[] | Yes | Array of technology/topic tags |
| `link` | string | Yes | URL to project or content |
| `hasDetails` | boolean | No | Shows "View Details" link if true |

## Example Icons

Software Engineering:
- 📱 Mobile App
- 💻 Web Application
- 💼 Enterprise/Business
- 🏦 Finance
- 🛒 E-commerce
- 📊 Analytics/Data
- 🔐 Security
- 🤖 AI/ML

Content Creation:
- 🎥 Video Course
- 📝 Blog Post
- 🎙️ Podcast
- 📚 eBook
- 🎬 Video Series
- 💡 Tutorial
- 📖 Article

## Tips

- Keep descriptions concise (they're limited to 3 lines)
- Use 3-4 relevant tags per project
- Choose clear, descriptive category names
- Projects appear in the order they're listed in the array
- The component is fully responsive and will adapt to all screen sizes
