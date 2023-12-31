lint:
	ruff check --select E,F,W,B,C4,I --ignore E402,E501,E712,B904,B905 --exclude=CTFByte/uploads CTFByte/ migrations/ tests/
	yarn lint
	black --check --diff --exclude=CTFByte/uploads --exclude=node_modules .
	prettier --check 'CTFByte/themes/**/assets/**/*'
	prettier --check '**/*.md'

format:
	isort --skip=CTFByte/uploads -rc CTFByte/ tests/
	black --exclude=CTFByte/uploads --exclude=node_modules .
	prettier --write 'CTFByte/themes/**/assets/**/*'
	prettier --write '**/*.md'

test:
	pytest -rf --cov=CTFByte --cov-context=test --cov-report=xml \
		--ignore-glob="**/node_modules/" \
		--ignore=node_modules/ \
		-W ignore::sqlalchemy.exc.SADeprecationWarning \
		-W ignore::sqlalchemy.exc.SAWarning \
		-n auto
	bandit -r CTFByte -x CTFByte/uploads --skip B105,B322
	pipdeptree
	yarn verify

coverage:
	coverage html --show-contexts

serve:
	python serve.py

shell:
	python manage.py shell
