from app.config.config import settings 
import mysql.connector
from mysql.connector import Error as MySQLError
import logging
from app.util.database.db_impl import DBImpl


class MySQL(DBImpl):
    def __init__(self):
        super().__init__()
    
    def __del__(self):
        pass

    def _connect(self):
        try:
            connection = mysql.connector.connect(
                host=settings.RDB_HOST,
                port=settings.RDB_PORT,
                user=settings.DB_USER,
                password=settings.DB_PASSWORD,
                database=settings.DB_NAME,
                connect_timeout=settings.CONNECTION_TIMEOUT
            )
            self.connection = connection
        except MySQLError as e:
            logging.error(f"데이터베이스 연결 실패: {e}")
            raise e

    def execute(self, query, bind_value=None):
        cnx = None
        cursor = None
        try:
            cnx = self.pool.get_connection()
            cursor = cnx.cursor()
            
            if bind_value is None:
                cursor.execute(query)
            else:
                cursor.execute(query, bind_value)
            
            query_type = query.strip().split()[0].lower()
            if query_type == "select":
                result = cursor.fetchall()
            
            elif query_type in ("insert", "update", "delete"):
                cnx.commit()
                result = {
                    "rowcount": cursor.rowcount,
                    "lastrowid": getattr(cursor, "lastrowid", None)
                }
            else:
                result = None

        except MySQLError as e:
            if cnx:
                try:
                    cnx.rollback()
                except:
                    pass
            logging.error(f"MySQL 쿼리 실행 오류: {e}, Query: {query[:100]}...")
            raise e
        except Exception as e:
            if cnx:
                try:
                    cnx.rollback()
                except:
                    pass
            logging.error(f"예상치 못한 오류: {e}, Query: {query[:100]}...")
            raise e

        finally:
            if cursor:
                try:
                    cursor.close()
                except Exception as e:
                    logging.warning(f"cursor.close() 실패: {e}")
            if cnx:
                try:
                    cnx.close()
                except Exception as e:
                    logging.warning(f"cnx.close() 실패: {e}")
        return result 

    def execute_many(self, query, bind_value, fields=None):
        cnx = None
        cursor = None
        try:
            cnx = self.pool.get_connection()
            cursor = cnx.cursor()
            cursor.executemany(query, bind_value)
            cnx.commit()
            
            # INSERT IGNORE의 경우 삽입된 행의 개수를 반환
            if query.strip().split()[0].lower() == "insert":
                return cursor.rowcount
            else:
                result = cursor.fetchall()
                return result
        except MySQLError as e:
            if cnx:
                try:
                    cnx.rollback()
                except:
                    pass
            logging.error(f"MySQL executemany 오류: {e}, Query: {query[:100]}...")
            raise e
        except Exception as e:
            if cnx:
                try:
                    cnx.rollback()
                except:
                    pass
            logging.error(f"예상치 못한 오류: {e}, Query: {query[:100]}...")
            raise e
        finally:
            if cursor:
                try:
                    cursor.close()
                except Exception as e:
                    logging.warning(f"cursor.close() 실패: {e}")
            if cnx:
                try:
                    cnx.close()
                except Exception as e:
                    logging.warning(f"cnx.close() 실패: {e}")

    def add_bind(self, key, value):
        self.bind_value[key] = value
    
    def clear_bind(self):
        self.bind_value.clear()
