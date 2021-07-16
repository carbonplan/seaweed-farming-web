# article-template-with-auth

template for a developing a standalone research article with authentication

## setup instructions

Here are some quick instructions for setting up a new article project with authentication:

1. Create a new repository by clicking on the ["Use this template" button](https://github.com/carbonplan/article-template-with-auth/generate). You'll be directed to a new page where you can name the new repository as you see fit.

![image](https://user-images.githubusercontent.com/2443309/110889698-8229f500-82a3-11eb-840a-37c5bd892992.png)
![image](https://user-images.githubusercontent.com/2443309/110890109-40e61500-82a4-11eb-8a4c-d31c864ceb22.png)

2. Link the new repository to vercel. Go to https://vercel.com/carbonplan and click on the "New Project" button. There you will be able to select the new 

![image](https://user-images.githubusercontent.com/2443309/110889957-fa90b600-82a3-11eb-9404-3fce90248bd7.png)
![image](https://user-images.githubusercontent.com/2443309/110890058-2744cd80-82a4-11eb-828b-37aeb181b426.png)

3. Set password / secret environment variables. Navigate in Vercel to the project settings (i.e. https://vercel.com/carbonplan/{project-name}/settings/environment-variables) and set the following secret environment variables:
  - `ADMIN_PASSWORD=@admin-password`
  - `JWT_SECRET=@jwt-secret-production-8dt5`

![image](https://user-images.githubusercontent.com/2443309/110890326-aa662380-82a4-11eb-8b0f-63611352436b.png)

4. That's it! You may need to redeploy the project from the Vercel UI or by pushing new changes to GitHub before the changes take effect.
