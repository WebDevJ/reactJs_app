# reactJs_app
SPA created using React.js, Express &amp; PostgreSQL

## Day 1

---
#### User Stories:

1. I as a user am prompted with landing page info that tells me what this app is.

2. I as a user see the **CALL TO ACTION** to **SIGN UP** as the 1st option, above other page elements.

3. I as a user know when I am **logged In** or have been registered as a new user, when my **user Dash Board** is displayed on the current page.

4. I as a user can see a list of **Community Events** on my **User Dash Board** and can see the event details for each event.

5. I as a user while viewing the **Community Events** section can clearly see a **Go to this Event** button which then adds selected event to the **My Events** section of my **User Dash Board** and then prompts me that it as been added by changing the button text to **Remove ME** and color to **RED**.

6. I as a user can search & add my own event to the **Community Events** section from my **user Dash Board** and will see **Community Events** updated with **myOwn** event upon making this change.

7. I as a user have the option to see only **My Events** that I am attending or that I created when when I click on the **My Events** button from the  **User Dash Board**. I from here can also edit my event or remove myself from going to a Event.

8. I as a user can change my mind and cancel an event that I created as a **new event** and this button is clearly labeled on the same section as the **My Events** section of my **User Dash Board**.

---

#### Wire Frames:
###### (landing Page)
![](./readMe_images/Project-3-Wireframes_1of4.jpg)
###### (Sign Up Section)
![](./readMe_images/Project-3-Wireframes_2of4.jpg)
###### (User Dashboard Section) / Main display
![](./readMe_images/Project-3-Wireframes_3of4.jpg)
###### (User Dashboard Section) / My Events Section
![](./readMe_images/Project-3-Wireframes_4of4.jpg)

---
### Routes
| Action | Route | Function | DB function |
|--------|---------------------------------------------------|---------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| GET | / | Renders index.ejs, which is populated by REACT | N |
| GET | /users | ? |  |
| POST | /users | Adds a new user (to be used in conjunction with new user form) | Y |
| GET | /users/me | Stores the user information for the session from expressJWT | N |
| POST | /users/login | To login in as the user (to be used in conjunction with the login view) | Y |
| GET | /events | JSON representation of all upcoming events for the community (pulled from the DB) | Y |
| GET | /events/:id | JSON representation of single event | Y |
| POST | /events | Adds a new event to the DB (events come from the search results from meetup | Y |
| PUT | /events/:id | Adds user comment to the event/id listing | Y |
| DELETE | /events/:id | Removes an event from the user's list | Y |
| GET | /events/search/:term/:catid/:city/:state/:country | Render JSON results from the Meetup API, passing the search term, category id, city, state, and country | N - but will need to parse this data to render each event - maybe together? |

---

### ERD's:
![](./readMe_images/Event_Community_ERD.png)
---
### WhiteBoard Screen Shots:
![](./readMe_images/1of3-whiteBoard.jpg)
![](./readMe_images/2of3-whiteBoard.jpg)
![](./readMe_images/3of3-whiteBoard.jpg)
