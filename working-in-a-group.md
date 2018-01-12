# Working in a group

Working in a group presents challenges from conflicting ideas to conflicting git commmits! Here are some best practices: 

## Conflicting Ideas

Alex had a manager at Asurion who was great, and everyone loved. One of his biggest peeves was engineers arguing over their opinions. In interviews, he would ask: 

"So you are on a team, and you think something should be done one way, and another team member with equal experience thinks it should be done another. What do you do?"

He would tell engineers "Decide, or I'll decide for you. And I have no idea, so you better decide."

When team members dissagree on something, it's often partly about making the right tech decision, and partly about ego. The ego part slows everything down. Let that go, ask a third party their oppinion, accept it, and move on. 

## Conflicting Commits

Git and GitHub are designed for team projects, so their are only a couple things to keep in mind. 

1. Use branches. 
	- Each member of the group should work on their own branch, and the branch should be named for the feature they are working on. For example: 'auth' or 'views'.
	- Commit on that branch everytime you have added something meaningful
	- When you finish the feature make a pull request on GitHub. 
	- Have another team member review your code, and then accept the pull request, thus merging your branch into master. 


1. Always be working on the most recent version of the code. This means when someone merges their branch into master via pull request, all other team members must: 

	- checkout from their current branch into the master branch: `git checkout master`
	- pull down the new changes in master: `git pull origin master`
	- check back out into their current branch: `git checkout mybranch`
	- and merge the new changes from master into their branch: `git merge master`

2. Never have two people work on the same file at the same time if at all possible. 

	- This is how you get merge conflicts. It impossible to avoid merge conflicts alltogether forever, so don't be afraid of them. But they can be time consuming and confusing especially at first. 
	- When you get a merge conflict, if it isn't obvious to you what to do, ask for help. What you should do is look for the <<<<<<< >>>>>>> and delete the code that should get replaced, and keep the code that should stay. Work with your team on this! They might have added something you didn't realize was needed. 
	- Always communicate on who is doing what. Divide up tasks so that people are not working on the same files. Sometimes this means you must wait for one developer to finish something before you start. This is what SCRUM is for! SCRUM at least once a day, probably twice while you are getting started. 

3. A final note on human conflicts:

	You know Dr. House? That character that is so good at his job that he can act like a total asshole? That guy is a loser. If that sort of attitude worked for software teams, Uber would have self flying cars by now, instead of 10 scandals, a million lawsuits, and the exact same app as Lyft. Don't be Uber, be Lyft. (Those folks are nice).

