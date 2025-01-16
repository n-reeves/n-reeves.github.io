// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "Quick access to pinned projects. More details on these repos can be found by clicking on the project names.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "This is a description of the page. You can modify it in &#39;_pages/cv.md&#39;. You can also change or remove the top pdf download button.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-deploying-and-integrating-pytorch-models-into-static-websites",
      
        title: "Deploying and Integrating Pytorch Models into Static Websites",
      
      description: "It&#39;s easier to understand and engage with neural models when you can try them yourself. This post walks through the method used to create the speech enhancement application found in my project portfolio.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/deploying-models-for-web/";
        
      },
    },{id: "post-neural-speech-enhancement-explained",
      
        title: "Neural Speech Enhancement - Explained",
      
      description: "Noisy enviroments can make speech more difficult to understand. In this project I explore a novel method for removing background noise and echos for audio files with multiple speakers.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/speech-enhancement-network/";
        
      },
    },{id: "projects-neural-speech-enhancement",
          title: 'Neural Speech Enhancement',
          description: "removing background noise and echos from noisy audio files",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Neural-Speech-Enhancement/";
            },},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/project_template/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6E%69%63%6B%77%72%65%65%76%65%73@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/n-reeves", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/nickwreeves", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
