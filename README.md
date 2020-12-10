# SUDECOR Daily Time Record System

Technologies used are: 
 1. Vue.JS 
 2. Vuetify 
 3. Axios
 4. Vuex
 5. Laravel-Excel Package
 6. Laravel API
 
 The App's work processes are:
 
 1. It imports excel file from a biometric excel report and insert it into the database using laravel-excel package (i did this because the biometric doesnt have any php library supported).
 2. After the insertion, it updates clients table from DB to insert new clients corresponding to the attendance rows. 
 3. The problem that the client was facing with excel reports is that there are double entries so i need to find a work around to get rid of the double entries. 
 4. After that, the user can now view the attendance rows without the double entries. 
 5. The user can also Insert holiday and insert it in the holiday's table. This serves as basis on the counting of total Holiday time the employee worked.
 6. After all the process the user made, he/she can now calculate the summary and view it in the browser or through excel. 
 
