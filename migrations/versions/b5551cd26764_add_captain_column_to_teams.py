"""Add captain column to Teams

Revision ID: b5551cd26764
Revises: 4e4d5a9ea000
Create Date: 2019-04-12 00:29:08.021141

"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.sql import column, table

from CTFByte.models import db

# revision identifiers, used by Alembic.
revision = "b5551cd26764"
down_revision = "4e4d5a9ea000"
branch_labels = None
depends_on = None

teams_table = table("teams", column("id", db.Integer), column("captain_id", db.Integer))

users_table = table("users", column("id", db.Integer), column("team_id", db.Integer))


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("teams", sa.Column("captain_id", sa.Integer(), nullable=True))

    bind = op.get_bind()
    url = str(bind.engine.url)
    if url.startswith("sqlite") is False:
        op.create_foreign_key(
            "team_captain_id", "teams", "users", ["captain_id"], ["id"]
        )

    connection = op.get_bind()
    for team in connection.execute(teams_table.select()):
        users = connection.execute(
            users_table.select()
            .where(users_table.c.team_id == team.id)
            .order_by(users_table.c.id)
            .limit(1)
        )
        for user in users:
            connection.execute(
                teams_table.update()
                .where(teams_table.c.id == team.id)
                .values(captain_id=user.id)
            )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("team_captain_id", "teams", type_="foreignkey")
    op.drop_column("teams", "captain_id")
    # ### end Alembic commands ###
