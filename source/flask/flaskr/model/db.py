import click
from flask import current_app, g
from flask.cli import with_appcontext


import pymongo


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)


@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


def init_db():
    get_db()


def get_db():
    if 'db' not in g:
        mongo = pymongo.MongoClient(
            current_app.config['MONGODB_DATABASE_URI'],
            maxPoolSize=50,
            connect=False
        )

        g.db = pymongo.database.Database(mongo, current_app.config['DATABASE'])

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()
