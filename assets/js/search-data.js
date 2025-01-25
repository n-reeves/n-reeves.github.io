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
        },{id: "nav-resume",
          title: "resume",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/resume/";
          },
        },{id: "post-neural-speech-enhancement-explained",
      
        title: "Neural Speech Enhancement - Explained",
      
      description: "Noisy environments can make speech more difficult to understand. In this project I explore a novel method for removing background noise and echos for audio files with multiple speakers",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/speech-enhancement-network/";
        
      },
    },{id: "post-randomized-control-trials-for-call-center-support",
      
        title: "Randomized Control Trials for Call Center Support",
      
      description: "Call center support is a fundamental component of the customer experience in any organization. This article details an approach I use to quantify the impact of new support initiatives on the customer experience before they launch.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/experiment-design-customer-service/";
        
      },
    },{id: "post-experiment-design-strategies-to-engage-quantitative-customers",
      
        title: "Experiment Design Strategies to Engage Quantitative Customers",
      
      description: "Experiment design can be a great way to find common ground between your sales and marketing teams and the customer. This article covers the value of observational studies in driving growth in a technical customer base.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/experiment-design-for-sales-marketing/";
        
      },
    },{id: "projects-applied-experiment-design",
          title: 'Applied Experiment Design',
          description: "Exploring practical methods for designing and implementing experiments that drive measurable impact in business decision-making",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Applied-Experiment-Design/";
            },},{id: "projects-neural-speech-enhancement",
          title: 'Neural Speech Enhancement',
          description: "Removing background noise and echos from noisy audio files",
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
