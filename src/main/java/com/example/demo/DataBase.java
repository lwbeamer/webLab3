package com.example.demo;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.util.List;

@ManagedBean(name = "dataBase")
@SessionScoped
public class DataBase {

    private Session session = null;

    public DataBase() {
        connect();
    }

    private void connect(){
        SessionFactory sessionFactory;
        try {
            try {
                Configuration configuration = new Configuration().configure();
                configuration.addAnnotatedClass(Point.class);
                StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder()
                        .applySettings(configuration.getProperties());
                sessionFactory = configuration.buildSessionFactory(builder.build());
            } catch (Throwable e) {
                e.printStackTrace();
                throw new ExceptionInInitializerError(e);
            }
            session = sessionFactory.openSession();
            getAll();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Point> getAll() {
        try {
            Transaction transaction = session.beginTransaction();
            List<Point> questStates = session.createQuery("select p from " + Point.class.getName() +" p").list();
            transaction.commit();
            return questStates;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean delete(Point questState) {
        try {
            Transaction transaction = session.beginTransaction();
            session.delete(questState);
            transaction.commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean create(Point questState) {
        try {
            Transaction tx = session.beginTransaction();
            session.save(questState);
            tx.commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
