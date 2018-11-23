"""empty message

Revision ID: 837e8aa0dddf
Revises: 
Create Date: 2018-11-23 16:48:01.168145

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '837e8aa0dddf'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'users', ['email'])
    op.create_unique_constraint(None, 'users', ['username'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='unique')
    op.drop_constraint(None, 'users', type_='unique')
    # ### end Alembic commands ###
