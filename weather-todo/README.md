# Weather Todo

A task manager built with React that connects to live weather data and uses it to make your to-do list context-aware. Tasks can be tagged as outdoor, indoor, or any — and the app warns you when bad weather conflicts with your outdoor plans.

---

## Features

- Add, complete, and delete tasks with outdoor / indoor / any tags
- Live weather via OpenWeatherMap API — search by city or use geolocation
- 5-day forecast bar showing daily conditions and min/max temps
- Weather warnings on outdoor tasks when conditions are bad (rain, storms, extreme temps)
- Smart banner summarising how many outdoor tasks are pending during bad weather
- Extra weather stats — feels like, humidity, and wind speed
- Completed tasks sink to the bottom automatically
- Clear all completed tasks in one click
- Tasks persist across sessions via localStorage

---

## Tech Stack

- React + Vite
- Tailwind CSS v4
- Font Awesome (react-fontawesome)
- OpenWeatherMap API
- localStorage

---

## Getting Started

### Prerequisites

- Node.js v22+
- A free [OpenWeatherMap](https://openweathermap.org) API key

### Installation

```bash
git clone https://github.com/your-username/weather-todo.git
cd weather-todo
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

> New OpenWeatherMap API keys can take 10–30 minutes to activate.

### Run

```bash
npm run dev
```

Open the local host in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── AddTaskForm.jsx    # Input + tag selector (outdoor / indoor / any)
│   ├── ForecastBar.jsx    # 5-day forecast strip
│   ├── TaskItem.jsx       # Checkbox, tag badge, weather warning
│   ├── TaskList.jsx       # Task counter, sort, clear completed
│   └── WeatherWidget.jsx  # City search, geolocation, current conditions
├── hooks/
│   └── useWeather.js      # Custom hook — fetches current weather + forecast
├── utils/
│   └── weatherHelpers.js  # Pure logic for bad weather detection
├── App.jsx                # Root component, all shared state lives here
└── index.css              # Tailwind import + background gradient
```

---

## What I Learned

This was my first React project, built step by step to understand the fundamentals properly.

- Component composition and lifting state up to a single source of truth
- `useState`, `useEffect`, lazy initialisers, and custom hooks
- Fetching from a real REST API with loading, error, and success states
- Running parallel requests with `Promise.all`
- Persisting state with `localStorage` synced via `useEffect`
- Browser Geolocation API
- Tailwind CSS v4 with `@theme` design tokens
- Working with environment variables and API keys safely

---

## License

MIT
