## Chugging Through Time

Explore historical train routes.


### Contributing

#### Install

**Backend**

```bash
cd backend
pip3 install uv && uv sync
uv run pre-comit install
uv run python chuggingthroughtime/manage.py migrate
uv run python chuggingthroughtime/manage.py createsuperuser
uv run python chuggingthroughtime/manage.py runserver
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```
