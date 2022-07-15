# MatrixWallpaper
An animated wallpaper for Lively Wallpaper based on [Lively Matrix](https://github.com/bad1dea/lively_matrix). A live demo can be seen [here](https://eliteasian123.github.io/MatrixWallpaper/src/).

![Preview](./src_lively/preview.gif)

# Compatibility
- ✔ [Lively Wallpaper](https://github.com/rocksdanister/lively) (Windows)
- ✔ [Komorebi (Fork)](https://github.com/Komorebi-Fork/komorebi) (Linux)

# Installing
Please refer to the [releases section](https://github.com/EliteAsian123/MatrixWallpaper/releases/) and read the instructions on the lastest release.

# Changing Settings

As for Lively Wallpaper, all you have to do is right-click on Matrix Wallpaper and click <kbd>Customise</kbd>!

![Lively Wallpaper](./img/lively_settings.png)

As for Komorebi, there is no built-in settings system, so you have the use the `settings` bash script. Simply navigate to the **installed** `matrix_wallpaper` folder, and run `./settings`. The config file will automatically be updated and the wallpaper will be changed after Komorebi restarts.

![Komorebi](./img/komorebi_settings.png)

# Building
> **Warning**
>
> Komorebi requires the use of a URL instead of an HTML file. The built Komorebi wallpaper uses a reference to
> [this](https://eliteasian123.github.io/MatrixWallpaper/src/), **not** the `src` folder.
>
> If you want to test out your own version of this wallpaper on Komorebi, I recommend creating a [Github Pages](https://pages.github.com/) website like I did.

```bash
$ git clone https://github.com/EliteAsian123/MatrixWallpaper.git
$ npm install

$ npm run buildLively # For Lively Wallpaper
$ npm run buildKomorebi # For Komorebi (Fork)
```

# Contributing
Go ahead :)

As for testing, making sure the `index.html` file works should be enough.
