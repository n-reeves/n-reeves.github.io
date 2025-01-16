---
layout: post
title: a post that describes how to create a post that immediately redirects to a different link
date: 2015-03-12 16:40:16
description: you are the king of forgetting
tags: formatting links
categories: sample-posts
---
Go to _config.yml. At the time of writing this, there was an example in the original template I commented out on line 121 of _config.yml

I have recopied the code below. The first few lines are supposed to be commented out in the config (up to external_sources:)

This is the way to add a blog post where the link immediately takes you to another website follows. The formatting is messed up when reading so just use an ide to find what to copy when searching for it

#External sources.
#If you have blog posts published on medium.com or other external sources,
#you can display them in your blog by adding a link to the RSS feed.
external_sources:
   - name: medium.com
     rss_url: https://medium.com/@al-folio/feed
   - name: Google Blog
     posts:
       - url: https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/
         published_date: 2024-05-14

