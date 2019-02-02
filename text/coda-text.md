

Причина по которой мы имеем 3 файла, для наших Grocery Lists.

1) К этой структуре я пришел сам. Основная задача этой иерархии/организации файлов ->
не только убрать необходимость на ранних этапах подключения к серверу, настраивать все необходимые настройки и права доступа.

В дальнейшем эти файлы(раньше тоже) - мы будем использовать их в скрипте импорта данных в базу нашего сервера.
Вот пример импорта из прошлого.

Т.е. логика  такая
пуста database - connected to main project /  production / 0 users

-> we move our server to heroku hosting
  -> run our import script that move static data into database.
  -> then we can run our project

  all is renders and calls without any issues.


  ====

  Вторая задача
  является тестирование и создание базовых компонентов в React проектах.
  Эти компоненты мы используем в 5-8 проектах и стааемся делать их таким образом, чтобы они были independent и работали
  в стрессовых условиях.

  это пока только желание, но мы стараемся к этому прийти.

====

  Еще одна из задач: это упрощение логики работы скрипта импорта в базу данных.
  До этого, раньше это был сложный процесс, а еще же нам надо предусмотреть то, что у нас есть graphQL сервер и в него тоже нужно будет делать импорт, когда мы уже откажемся от старой работы нашего сервера


  Скрипт импорта предыдущий я тоже с радостью удалю. Он нам уже непонадобится.

  Еще есть ML команда, которая тоже работает над тем, чтобы увеличить коллекцию наших
  Grocery Lists и дальше они тоже будут добавленны в наш проект.



  ===


  Сказать что код этого плагина сейчас не ES6 и другие проекты изза этого делают ошибку в момент билда проекта и скорее
  всего нам прийдется плагни переделывать под другой toolset, который позволит использовать babel,
  который будет компилировать наш код и т.о. у нас заработает builds проектов - будет работать minifications
  и перестанет происходить быть ошибка builds.

------
 
if we move whole fetch plugin at ES6 version, we'll need to replace JSON files 
into JS arrays, because JSON has issues with our babel builds before

  -----
So maybe whole idea, realted to split are good and maybe we should start it right away.

  ----

Question, related to import, that should be rased too.
  I want to develop simple, modular approach for import script (one table can be adjusted without breaking the whole import process)
  approach для импорта.

  Что нам надо(let's check the simple DB schema, that we have at GS)

  создаем - залили - добавили в базу записи о Grocery Lists ->
   взяли все Departments, принадлежащие этому GL и добавили в базу(попутно проверяя эти Departments for duplicates)
   (if duplicate -> avoid adding, but grabbing Dep Id of this field)
   потому взяли все(смотреть схему тут) Ingredients(создаем или получаем их ID) ->
   параллельно связывая Ingredients with Departments, которые были созданны


  (можно как перебором по основной базе - long) или передать данные о Department IDS в функционал ---
  создающую Ingredients.


  Также DepIDS нужно отправить и сохранить в нашей записи о GL(наверное обновив ее или сделать функции создания GL записи
  await -> пока все данные не соберуться вместе).
  
  Data about Ingredients, using mongoDB Ingredients


---

I think soon or later we should change the package name. Because npm has other popular module with name fetch. it related to requests from API server. And i want to separate some methods, that looks stupid, but we using them in our work. 
Separated files can have move popularity and can be used not just at JS projects.


---

https://github.com/GroceriStar/static-data/tree/master/dist/import/Groceristar

https://trello.com/c/A21ywVVV/37-plans
