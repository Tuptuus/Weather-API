const input = document.querySelector('input');

const apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&lang=pl&APPID=16847f8fbc0e8e0bcde24efbf66d3ec2";
const units = "&units=metric";

let city;
let url;
let $temp;

const getWeather = () => {
    city = input.value;
    url = apiLink + city + apiKey + units;
    $(".warning").html('');
    input.value = '';
    
    axios.get(url)
    .then(res => {
        console.log(res);
        $temp = res.data.main.temp;
        $(".temp").html(res.data.main.temp + "°C").css({fontWeight: 'bold'});
        $(".feels_temp").html("Odczuwalna: " + res.data.main.feels_like + "°C");
        $(".humidity").html(res.data.main.humidity + "%").css({fontWeight: 'bold'});
        $(".pressure").html(res.data.main.pressure + "hPa").css({fontWeight: 'bold'});
        $(".wind").html(Math.round(res.data.wind.speed * 3.6) + "km/h").css({fontWeight: 'bold'});
        $(".city-name").css({fontWeight: 'bold', fontSize: '20px'}).html(res.data.name);
        $(".desc").html(res.data.weather[0].description);
        $(".weather").html(res.data.weather[0].main);
        if(res.data.weather[0].main == "Clouds")
        {
            $(".weather").html("Pochmurnie").css({fontWeight: 'bold'});
        }
        if(res.data.weather[0].main == "Rain")
        {
            $(".weather").html("Deszczowo").css({fontWeight: 'bold'});
        }
        if(res.data.weather[0].main == "Clear")
        {
            $(".weather").html("Bezchmurnie").css({fontWeight: 'bold'});
            $(".desc").html("");
        }
        if(res.data.weather[0].main == "Snow")
        {
            $(".weather").html("Śnieg").css({fontWeight: 'bold'});
            $(".desc").html("");
        }
        if(res.data.weather[0].main == "Mist")
        {
            $(".weather").html("Zamglenie").css({fontWeight: 'bold'});
            $(".desc").html("");
        }

        if($temp >= -50 && $temp <= 0)
        {
            $(".wrapper").css({background: "linear-gradient(45deg,#3298db, #5118c4, #18bec4)", animation: "gradient 7s linear infinite", backgroundSize: "400% 100%", animationDirection: "alternate"});
        }
        if($temp >= 1 && $temp <= 15)
        {
            $(".wrapper").css({background: "linear-gradient(45deg,#18c468, #d0d61c)", animation: "gradient 7s linear infinite", backgroundSize: "400% 100%", animationDirection: "alternate"});
        }
        if($temp >= 16 && $temp <= 100)
        {
            $(".wrapper").css({background: "linear-gradient(45deg,#F17C58, #E94584, #FF3706)", animation: "gradient 7s linear infinite", backgroundSize: "400% 100%", animationDirection: "alternate"});
        } 
    })
    .catch(() => {
        $(".warning").html('Podaj poprawne miasto').css({color: "white", fontSize: "25px", fontWeight: "bold",
            textShadow: "-2px 0px 5px #000000, 2px 0px 5px #000000, 0px 2px 5px #000000, 0px -2px 5px #000000"});
        $(".temp").html('');
        $(".humidity").html('');
        $(".city-name").html('');
        $(".weather").html('');
        $(".pressure").html('');
        $(".wind").html('');
        $(".feels_temp").html('');
        $(".desc").html('');
    });

    
    if(input.value == '')
    {
        $(".temp").html('');
        $(".humidity").html('');
        $(".city-name").html('');
        $(".weather").html('');
        $(".pressure").html('');
        $(".wind").html('');
        $(".feels_temp").html('');
        $(".desc").html('');
    }
};

$('#btn').on('click', getWeather);

$(document).on('keypress',function(enter) {
    if(enter.which == 13) {
        getWeather();
    }
});