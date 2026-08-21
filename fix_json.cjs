const fs = require('fs');

// 1. Update projects.ts to parse JSON arrays from video_url
let proj = fs.readFileSync('src/data/projects.ts', 'utf-8');

proj = proj.replace(/videoUrl\?: string;/g, 'videoUrls?: string[];');
proj = proj.replace(/videoUrl: data\.video_url \|\| undefined,/g, `videoUrls: (() => {
    if (!data.video_url) return [];
    try {
      const parsed = JSON.parse(data.video_url);
      if (Array.isArray(parsed)) return parsed;
      return [data.video_url];
    } catch (e) {
      return [data.video_url];
    }
  })(),`);

proj = proj.replace(/videoUrl: "\/projects/g, 'videoUrls: ["/projects');
proj = proj.replace(/\.mp4",/g, '.mp4"],');

fs.writeFileSync('src/data/projects.ts', proj);

// 2. Update ProjectDetail.tsx to support videoUrls grid
let detail = fs.readFileSync('src/pages/ProjectDetail.tsx', 'utf-8');

detail = detail.replace(
  /{project\.videoUrl && \(/,
  `{project.videoUrls && project.videoUrls.length > 0 && (`
);

detail = detail.replace(
  /<VideoPlayer\s+youtubeId=\{project\.youtubeId\}\s+bunnyVideo=\{project\.bunnyVideo\}\s+videoUrl=\{project\.videoUrl\}\s+title=\{project\.title\}\s+poster=\{project\.image\}\s+videoOrientation=\{project\.videoOrientation\}\s*\/>/,
  `<div className={\`grid gap-4 \${project.videoOrientation === 'vertical' ? (project.videoUrls.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : project.videoUrls.length === 2 ? 'grid-cols-2 max-w-4xl mx-auto' : project.videoUrls.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4') : 'grid-cols-1'}\`}>
        {project.videoUrls.map((url, i) => (
          <VideoPlayer
            key={i}
            youtubeId={i === 0 ? project.youtubeId : undefined}
            bunnyVideo={i === 0 ? project.bunnyVideo : undefined}
            videoUrl={url}
            title={project.title}
            poster={i === 0 ? project.image : undefined}
            videoOrientation={project.videoOrientation}
          />
        ))}
      </div>`
);

detail = detail.replace(
  /\{\(project\.youtubeId \|\| project\.bunnyVideo \|\| project\.videoUrl\) && \(/g,
  `{(project.youtubeId || project.bunnyVideo || (project.videoUrls && project.videoUrls.length > 0)) && (`
);

fs.writeFileSync('src/pages/ProjectDetail.tsx', detail);
