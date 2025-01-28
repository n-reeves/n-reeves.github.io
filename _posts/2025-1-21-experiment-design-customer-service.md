---
layout: post
title: Experimental Design for Call Center Support Strategies
date: 2025-01-21 11:59:00
description: Call center support is a fundamental component of the customer experience in any organization. This article details an approach I have used to quantify the impact of new support initiatives on the customer experience before they launch
tags: 
categories: Statistics
related_posts: false
toc:
  beginning: true
---

## Introduction
In modern customer service, call centers play a critical role in shaping the customer experience and, by extension, customer loyalty. As businesses strive to improve these experiences, they often experiment with new customer service methods or tools to identify approaches that work best. Without a robust statistical framework, assessing these changes becomes prone to bias and misinterpretation, potentially leading to costly missteps or the adoption of innefective programs.

Randomized Control Trials (RCTs) offer a powerful methodology for evaluating new strategies in call centers. By randomizing treatments and analyzing their outcomes, businesses can identify causality with confidence, even when dealing with complex systems like human behavior and operational variability. Additionally, as agent-based AI systems are increasingly adopted by service organizations, robust frameworks for assessing their performance are essential to guiding development. Effective statistical models can bridge the gap between the machine learning development lifecycle and proxies for the customer experience

_Disclaimer on Generative AI use:_ This document was created with the help of ChatGPT, which summarized key content from a larger unstructured piece I wrote on the topic. While I've validated the content in the article, this page will change a lot over the next week as I edit and expand the content here.

## Why Statistics?
Businesses invest heavily in customer service because it directly impacts retention, reputation, and revenue. Despite this, decision-makers often rely on anecdotal evidence or incomplete data to assess the success of new initiatives. This can lead to ineffective strategies being implemented at scale or valuable ones being overlooked.

Statistics provide a way to objectively measure the impact of changes, isolating the effects of a new customer service method from other confounding factors like seasonal trends, customer demographics, or operational differences. For example, while a manager might assume a drop in call resolution time indicates an improvement, statistical analysis can reveal whether this change is consistent across representative groups or if it disproportionately benefits a subset of customers.

By applying a rigorous statistical framework, companies can evaluate whether a new approach genuinely improves customer experience or simply shifts the burden elsewhere.

## Experimental Design
### Randomized Control Trials (RCTs): Principles and Advantages
RCTs are the gold standard for causal inference because they minimize bias through random assignment. In a call center, this could involve randomly assigning callers to different customer service methods, ensuring each group is comparable.

This randomness helps account for external factors like time of day, caller mood, or even weather, which might otherwise skew results. For example, callers during peak hours may have different expectations than those during quieter times, making randomization critical for isolating the effect of the new method.

### Challenges Unique to Call Centers
Call centers introduce unique challenges, such as variability among agents, geographic diversity of callers, and the difficulty of obtaining consistent feedback. Designing experiments that accommodate these factors—like stratifying samples by geography or time of day—ensures more reliable results. 

Additionally, it can be expensive and time-consuming to train your representatives on a new approach to service. These costs can increase the risk of altering a service strategy without solid evidence to support their value.

## Measuring Customer Experience

**Response Variables: Defining Success**
The choice of response variable is critical. Common metrics include customer satisfaction scores, first-call resolution rates, and net promoter scores (NPS). However, these metrics come with caveats:

- Optional ratings: When responses are voluntary, they often exhibit a bimodal distribution—extremely high or low ratings—making it harder to detect subtle changes in customer sentiment.
- Ordinal data: Metrics like 1–5 ratings are ordinal, not interval, meaning the difference between a 4 and a 5 may not be equivalent to that between a 2 and a 3.

To mitigate issues with response rate, businesses can:

- Integrate feedback collection directly into the call with the representative
- For digital products, work with product teams to integrate the feedback form directly into the product itself.

An important to consider that feedback questions asked directly representatives may result in skewed answers. Many people will feel more uncomfortable giving negative feedback when a human is involved.

To handle missing response variables and the bimodal nature of the data, some solutions are:

- Opt for measures of call resolution rates that don't depend on optional customer feedback.
- Use binary variables to categorize experiences into positive/not-positive or negative/not-negative.

It's important to note that there are often underlying relationships that influence the presence and absence of responses. It is always possible that highly positive or negative experiences may lead to higher response rates. Additionally, while some may wish to take advantage of the ordinal nature of the data, it's worth reflecting on what each category means and what benefit you hope to gain in inference by adopting these techniques. In practice, I have found it helpful to reduce the problem to measures that identify when customers have positive experiences and when they have negative experiences.

## Addressing Common Problems
### Sampling Strategies
Sampling can introduce bias if not carefully managed. When measuring call center performance, I have two primary considerations. First, are our key customer demographics represented fairly in the data we collect? Second, what is the relationship between the skill of individual reps and the customer experience?

In an ideal world, we want to adopt service strategies that improve the experience for every possible group. In practice, you may want to prioritize certain groups. Getting equal representation of your customers across geography, age, gender, etc., is difficult without mature service analytics infrastructure. Stratified sampling is a great way to get the desired effect but relies on a link between the calls and user demographic data.

Additionally, the time when users call is also an important consideration and worth stratifying depending on your product. A user that calls in at three in the morning is likely to have a pretty good reason to do so. There may be a relationship between this variable and the customers that need the highest quality of care. Without consideration, it's possible that peak time calls are overrepresented in your experiment, reducing the power of inference.

On the second point, good reps can have a large positive effect on the way your customers feel after calling in and resolution rates. Naturally, a large number of calls and reps can help control for an individual's influence on the way you measure a new strategy. However, this would defeat the purpose of this framework. We want to avoid investing money into training until we have evidence that supports the new strategy. This problem can be addressed through a combination of how we randomly assign treatment and the statistical techniques that we use.

### Assigning Treatment
To randomly assign a new service technique, start by selecting a subset of service representatives at random. Using stratified sampling can ensure their hours and locations cover the temporal and geographic ranges you wish to control for. Over time, calls handled by these representatives will form the treatment group. To account for ramp-up or training, you may exclude data from the initial days or weeks.

This approach minimizes the training required and reduces the risk of exposing customers to a suboptimal process. Alternatively, representatives could alternate between strategies for each call, limiting the analysis to this group. While this controls for individual differences, there are practical and theoretical drawbacks:

- The method doesn’t leverage the full dataset from your organization.
- It requires technical infrastructure that may not always be feasible.
- Alternating strategies could confuse representatives, potentially lowering service quality.

As I'll cover in the next section, an appropriate set of statistical models/tests can help account for the potential correlation between calls accepted by the same rep and the influence of an individual rep's skill level on the response.

## Testing
In call center experiments, hierarchical models are invaluable for accounting for nested data structures. For example:

- Fixed effects could include time of day or customer demographics.
- Random effects could capture variability among agents, accounting for the fact that some are naturally more effective than others.

By modeling this hierarchy, businesses can better understand the true impact of a new method, separating agent-level effects from the overall treatment effect.

## Case Study: Applying the Framework
An RCT comparing two customer service methods might proceed as follows:
- **Setup:** 10 agents are trained in both methods, and 2,000 callers are randomly assigned to each method over a month.
- **Analysis:** Hierarchical logistic regression reveals that the new method increases the odds of a positive review by 20%, with no significant increase in negative reviews.

This result provides a clear, data-driven rationale for scaling the new method while addressing potential stakeholder concerns about negative impacts.

## Communication and Pragmitism in Applied Statistics
Statistical findings must be translated into actionable insights for business leaders. For example:

- Use visualizations like confidence intervals to convey uncertainty.
- Avoid jargon like "p-values" unless paired with intuitive explanations (e.g., "There’s less than a 5% chance these results are due to random chance").

Pragmatism is key: While statistical rigor is essential, businesses ultimately need to make decisions. Even imperfect data can guide better choices if interpreted thoughtfully.

## Future Directions: AI, LLMS, and the Future of Service
As AI tools like large language models (LLMs) become integral to customer service, the role of statistics becomes even more critical. A/B testing AI-driven methods—such as comparing chatbot versions or evaluating hybrid human-AI workflows—requires robust frameworks to measure their impact on customer experience.

Automating these frameworks ensures consistency and scalability, allowing businesses to rapidly iterate on new tools while maintaining a clear link between service strategies and customer satisfaction.

