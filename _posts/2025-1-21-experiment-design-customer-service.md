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

_Disclaimer: This article is in progress. Updates may flow in throughout the week

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
### Mixed Effects (Hierarchical) Models
Mixed effects models, also known as hierarchical or multilevel models, combine fixed and random effects to analyze data with a naturally grouped structure (e.g., customer data grouped by region or product). They help model relationships more accurately when there are varying influences across subgroups within a larger population.

- Fixed effects are coefficients you want to estimate and interpret directly, representing the average relationship across all data.
- Random effects capture subgroup-level variability and account for differences between groups, using partial pooling to balance the influence of smaller and larger groups.

Hierarchical data is extremely common in many business applications and occurs often once you know how to recognize it. You may be interested in webpage clicks, but you have multiple observations for each customer. You are interested in patient outcomes, but you want to control for the hospital. Test scores and students, warehouses and ship speed, the list goes on.

This article doesn't serve as a full explanation of the theory behind these models. If you would like a great resource, [Beyond Multiple Linear Regression](https://bookdown.org/roback/bookdown-BeyondMLR/) by Roback and Legler is a great resource if you would like more background. At it's core, its important to know the following:

- Generalized linear models assume that observations are independent of one another.
- Hierarchical data violates this assumption because observations within the same group may be correlated (e.g., customers from the same region or students in the same classroom).
- You may have many groups or the size of your groups may vary significantly. In either case, this could result in issues when applying standard encoding methods for categorical variables.
- Mixed effects models address these issues by treating group-level effects (coefficients) as random variables. This approach allows the model to learn from all groups collectively, applying partial pooling to shrink group estimates toward the overall population mean.

The result is a robust inferential tecnique that allows you to:

- Measure the relationship between your predictors (e.g., treatments) and a response variable while accounting for correlations within groups.
- Quantify how much variability in the response can be attributed to differences between groups, offering insight into the influence of group-level factors.

### Mixed Effects Models within the Framework
Mixed effects models are well suited to this experimental framework, as they enable the analysis of hierarchical data while addressing the variability inherent in call center environments. These models combine fixed effects, which capture the treatment impact of a new service strategy, with random effects that account for differences among individual customer service representatives.

Depending on the context, additional variables can be modeled as fixed or random effects. Fixed effects represent factors of primary interest that remain consistent across repeated studies, while random effects account for variations arising from sampling. For example, in our service study, the selection of representatives to implement the new technique and the geographic distribution of callers could be modeled as random effects. Conversely, the service strategy type, which is central to understanding its causal impact on the response, would be treated as a fixed effect.

## Case Study: Applying the Framework
### Set Up
For ease of understanding, let's walk through a theoretical experiment. Imagine you are interested in releasing a new AI agent that integrates with the process used by your service reps. You start by randomly sampling 1,000 reps across your different call centers. You then partition these reps into groups based on when they work and their geographic coverage. Using stratified sampling, you produce a set of 100 reps that are evenly distributed across the time frames and regions you are concerned with. These reps are trained in the new technique and begin to apply it in practice.

To eliminate potential confounding effects from ramp-up time, you exclude the first three days of data after training. Your call centers ensure a high match rate with internal customer demographic data by using robust customer ID matching based on phone numbers and names recorded during calls.

The experiment includes calls handled by 2,000 representatives, among them 100 trained reps using the new AI agents. The objective is to determine whether the new AI agents have a positive causal effect on a binary response: whether customers rated their experience with four or five stars on a 1–5 scale in an optional questionnaire embedded in your product. However, you suspect that late-hour reps may encounter more irate customers and that older customers are more likely to complete the questionnaire, both of which could bias the results.

### Variables and Model Definition
Let $$Y_{ij}$$ represent the response variable for the $$i$$th representative on their $$j$$th call. Let $$T_{i}$$ be the binary variable indicating whether representative $$i$$ was trained on and applied the AI-based strategy. Let $$B_{ij}$$ be a binary variable indicating whether the customer on the $i$th rep's $j$th call is over the age of 70, and let $$C_{ij}$$ be a binary variable indicating whether the call occurred between 12 a.m. and 7 a.m. in the customer's local timezone.

In regression analysis for inference, it is common to start by building a model without the variable of interest. Once the model is complete, the treatment variable is added to assess its significance. For simplicity, we define the entire model, including the treatment variable, from the outset.

Call level (level one):

$$
Y_{ij} ​= a_{i} + b_{i}B_{ij} + c_{i}C_{ij} + \epsilon_{ij}
$$

Here, $$a_{i}$$ represents the representative-specific intercept, $$b_{i}$$ represents the representative-specific effect of working with older callers, and $$c_{i}$$ represents the representative-specific effect of taking nighttime calls. $$\epsilon_{ij}$$ is the randomly distributed error associated with the observation. 

Rep level (level two): 

$$
a_{i} = \alpha_{0} + \alpha_{1}T_{i} + u_{i}
b_{i} = \beta_{0} + \beta_{1}T_{i} + v_{i}
c_{i} = \gamma_{0} + \gamma_{1}T_{i} + w_{i}
$$

The representative-level variables are defined based on the interaction terms with the treatment variable that we include in our model. The key idea is that $$u_{i}, v_{i}, w_{i}$$ are random effects intended to capture between rep variability in the intercepts and slopes. The coefficients $$\alpha, \beta,\gamma$$ are all fixed effects. If the new strategy has a positive relationship with the response, we would expect this to be reflected in the values and significance of $$\alpha_{1}, \beta_{1}, \gamma_{1}$$.

## Communication and Pragmitism in Applied Statistics
When working with business leaders, simply stating the p-value, confidence interval, and point estimate associated with the coefficient of your treatment is not enough. Extending these estimations to provide a range of expected ROI or other actionable metrics in the context of the response variable is critical. Additionally, incorporating the cost of implementing the program can make the decision easier and facilitate a more productive discussion.

To adjust and simplify our case study, suppose we adopted a simpler model that dropped all interaction terms with the treatment, leaving only a fixed effect associated with it. Assume our response variable is binary, indicating whether the caller gave a 4+ star rating.

Suppose the estimated coefficient for the treatment is 1.25 with a 95% confidence interval of [1.1, 1.4]. Thus, the new strategy leads to an increase in the log odds by 1.25. But what does this mean? We can eponentiate the bounds of the confidence interval to instead produce the estimates in terms of the odds (the ratio of the probability of success to the probability of failutre). The result is confidence interval that spans [~3, ~4], but again, how can this be used to help business decisions?

One straightforward method is to tie the results of inference back to the KPI that motivated your choice in response. For example, an org might use the percentage of calls with a certain rating as a health check. Look at the current rate of positive ratings under the existing strategy to contextualize what a three to four times increase in the probability of recieving a positive rating would look like.

Say the current rate is $$.4$$ Under the assumption that $$p = .4$$, the existing odds would be $$\frac{.4}{.6} = \frac{40}{60}$$

Convert the bounds of your confidence intervals to odds based on your existing success rate

Lower Bound: $$40/60 * 3 = 120/60 = 2$$
Upper Bound: $$40/60 * 4 = 160/60 = 2.67$$

Now convert the odds back to probabilities to produce as estimated range for the new rate

Lower bound: $$\frac{2}{1 + 2} = .67$$
Upper Bound: $$\frac{2}{1 + 2.67} = .73$$

To contextualize the confidence interval, remind stakeholders that these values represent the range of plausible outcomes given the data. I like to provide extreme examples to help them understand the downside of working with point estimates alone. 

- If customers assigned to trained reps were unusually cheerful by chance, the results might overestimate the true effect
- Conversely, if treated reps happened to get more difficult customers, the results might underestimate the effect.

The confidence interval is just a means to quantify this effect. If we were to repeat this experiment 100 times with random sets of customers and random reps each time, we would expect that in 95% of these trials this range would include the true value added by the new strategy. If this explanation is too heady for your partners, you can start by explaining there is a 95% chance that the value offered by the new strategy will fall between the range that you calculated.

## Future Directions: AI, LLMS, and the Future of Service
As AI tools like large language models (LLMs) become integral to customer service, the role of statistics becomes even more critical. A/B testing AI-driven methods—such as comparing chatbot versions or evaluating hybrid human-AI workflows—requires robust frameworks to measure their impact on customer experience.

Automating these frameworks ensures consistency and scalability, allowing businesses to rapidly iterate on new tools while maintaining a clear link between service strategies and customer satisfaction.

