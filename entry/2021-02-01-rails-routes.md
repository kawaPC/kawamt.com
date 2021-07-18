---
title: Rails6.1でroutesファイルを分割した
---

Rails6.1からconfig/routes.rbの内容を別ファイルに外だしできるようになりました。

現プロジェクトではRailsは最新バージョンを保っているので、せっかくだしということでroutesファイルの分割に挑戦してみました。

元々namesapceで管理画面用(admin)、ユーザー用(sales)、外部サービス連携用(v1)と別れていたので
その定義のままファイルを分割。以下にサンプルを載せておきます。

(**実際にはサンプルの3~4倍くらいの量があったので、かなり読みやすくなりました。**)
Rails6.1以上で開発してる方は機会があればぜひ

## Before

```ruby
# config/routes.rb

Rails.application.routes.draw do
  namespace :admin do
    get '/events' => 'events#index'
    get '/events/:id' => 'events#show'
    post '/events' => 'events#create'
    delete '/events/:id' => 'events#destroy'
    get '/users' => 'users#index'
    get '/users/:id' => 'users#show'
    put '/users/:id/suspension' => 'users#suspension'
    get '/tickets' => 'tickets#index'
    get '/tickets/:id' => 'tickets#show'
    put '/tickets/:id/suspension' => 'tickets#suspension'
  end

  namespace :sales do
    get '/events' => 'events#index'
    get '/events/:id' => 'events#show'
    get '/carts' => 'carts#show'
    get '/carts/check' => 'carts#check'
    put '/carts' => 'carts#update'
    get '/users/login' => 'users#login'
    get '/users/new' => 'users#new'
    get '/users/:id/edit' => 'users#edit'
    put '/users/:id' => 'users#edit'
    post '/users' => 'users#update'
    post '/users' => 'users#create'
  end

  namespace :v1 do
    get '/admissions' => 'admissions#index'
    get '/admissions/:ticket_id/validation' => 'admissions#validation'
    post '/admissions' => 'admissions#create'
  end
end
```

## After


```ruby
# config/routes.rb

Rails.application.routes.draw do
  draw(:admin)
  draw(:sales)
  draw(:v1)
end
```

```ruby
# config/routes/admin.rb

namespace :admin do
  # =============================================================
  # events
  # =============================================================
  get '/events' => 'events#index'
  get '/events/:id' => 'events#show'
  post '/events' => 'events#create'
  delete '/events/:id' => 'events#destroy'

  # =============================================================
  # users
  # =============================================================
  get '/users' => 'users#index'
  get '/users/:id' => 'users#show'
  put '/users/:id/suspension' => 'users#suspension'

  # =============================================================
  # tickets
  # =============================================================
  get '/tickets' => 'tickets#index'
  get '/tickets/:id' => 'tickets#show'
  put '/tickets/:id/suspension' => 'tickets#suspension'
end
```

```ruby
# config/routes/sales.rb

namespace :sales do
  # =============================================================
  # events
  # =============================================================
  get '/events' => 'events#index'
  get '/events/:id' => 'events#show'

  # =============================================================
  # carts
  # =============================================================
  get '/carts' => 'carts#show'
  get '/carts/check' => 'carts#check'
  put '/carts' => 'carts#update'

  # =============================================================
  # users
  # =============================================================
  get '/users/login' => 'users#login'
  get '/users/new' => 'users#new'
  get '/users/:id/edit' => 'users#edit'
  put '/users/:id' => 'users#update'
  post '/users' => 'users#update'
  post '/users' => 'users#create'
end
```

```ruby
# config/routes/v1.rb

namespace :v1 do
  # =============================================================
  # admission
  # =============================================================
  get '/admissions' => 'admissions#index'
  get '/admissions/:ticket_id/validation' => 'admissions#validation'
  post '/admissions' => 'admissions#create'
end
```
