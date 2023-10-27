# 1.0.0 (2023-10-27)


### Bug Fixes

* **db/validators:** fix isDateTimeString regex ([d1fdf57](https://github.com/DavidWesley/emailsender/commit/d1fdf574c0dfc343cddbfb2369643e7133f3138b))
* fix filter for customers with subscriptionTier and lastVisitAt ([443d6b1](https://github.com/DavidWesley/emailsender/commit/443d6b1a7efbc9c1b9a9b0335f96958bc9578c6f))
* **utils:** update range error message for quantity input on seed's functions ([635dbb5](https://github.com/DavidWesley/emailsender/commit/635dbb502b9a1e6081d1dc1a2e85778400065ece))


### Features

* Add faker module for PT_BR locale ([b04dae7](https://github.com/DavidWesley/emailsender/commit/b04dae7bb2a1150d11553b04faf6fc22928fc8c4))
* add main functionality to send emails to clients on specific weekday ([e552e80](https://github.com/DavidWesley/emailsender/commit/e552e80c68fe4e27fdaa78f60eca869b4030b8e6))
* **db/customers:** Add 'lastVisitAt' field to CustomerModel ([1acbdda](https://github.com/DavidWesley/emailsender/commit/1acbddaa2c6d97b26a5c08e5cb74ec53c4ae20e0))
* **db:** add clients model to database ([e1f2949](https://github.com/DavidWesley/emailsender/commit/e1f294932bf909979dc813df2f72d58014b4944a))
* **db:** add clients model with name, email, and subscriptionTier fields ([f3490ea](https://github.com/DavidWesley/emailsender/commit/f3490ead003acfb0b434c6d0fc7b5567d69cbc7a))
* **db:** Add InMemoryTable class for managing in-memory tables ([62c6b89](https://github.com/DavidWesley/emailsender/commit/62c6b89d473cc7894441302ca097147258901ae2))
* **db:** Add isNumber and isArray validators ([6e08501](https://github.com/DavidWesley/emailsender/commit/6e085014d7feb8b662faf3b32c12c83d7872248c))
* **db:** add validators module with common validation functions ([1152c98](https://github.com/DavidWesley/emailsender/commit/1152c987b3fe83a5173aa657539d3446e801d60c))
* **db:** add vehicles collection and seed vehicles data ([023550e](https://github.com/DavidWesley/emailsender/commit/023550e5cb3ebca64d0583a319aaeb05fa598d67))
* **email:** Add email sending functionality ([d366090](https://github.com/DavidWesley/emailsender/commit/d366090db5de17879f0f1d0f54fb32efca0c7661))
* **utils:** add create-client function for generating random client data ([7a516c7](https://github.com/DavidWesley/emailsender/commit/7a516c7b541a097cee2a326e57e7bc9aa0893276))
* **utils:** add function to seed database with random clients ([7d8d03f](https://github.com/DavidWesley/emailsender/commit/7d8d03fe3edaf57aa0f78f8f7e91cd8ee1bdea7d))
* **utils:** add generateEmailBody function for sending emails ([93739bd](https://github.com/DavidWesley/emailsender/commit/93739bde00b53fc0443d968d310a0f6863fc2a26))
* **utils:** add getWeekDayFullName function ([aef04cb](https://github.com/DavidWesley/emailsender/commit/aef04cb368d686eb2ee04bf42584326af7bdb6be))
* **utils:** Add isFirstDateInPreviousMonth function ([222bc31](https://github.com/DavidWesley/emailsender/commit/222bc311dcdce5686aaeebcd6d719c47346ee7b5))
