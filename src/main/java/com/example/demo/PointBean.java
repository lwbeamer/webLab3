package com.example.demo;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import javax.faces.component.UIComponent;
import javax.faces.event.ActionEvent;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@ManagedBean(name = "pointBean", eager = true)
@SessionScoped
public class PointBean {
    private Point pointFromForm = new Point();
    private Point pointFromCanvas = new Point();
    private List<Point> pointList;

    @ManagedProperty("#{dataBase}")
    private DataBase dbManager;


    public void changeX(ActionEvent event){
        UIComponent component = event.getComponent();
        String value = (String) component.getAttributes().get("value");
        pointFromForm.setxValue(Double.parseDouble(value));
    }

    public void addPointFromForm() {
        long startTime = System.nanoTime();
        Point currentPoint = new Point();
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss dd.MM.yyyy");
        currentPoint.setCurrentTime(dateFormat.format(new Date(System.currentTimeMillis())));

        if(checkR(pointFromForm.getrValue()) && checkX(pointFromForm.getxValue()) && checkY(pointFromForm.getyValue())){
            currentPoint.setrValue(pointFromForm.getrValue());
            currentPoint.setxValue(pointFromForm.getxValue());
            currentPoint.setyValue(pointFromForm.getyValue());

            currentPoint.setHitResult(isItInArea(currentPoint));

            String executionTime = String.valueOf(System.nanoTime() - startTime);
            executionTime +=" ns";

            currentPoint.setExecutionTime(executionTime);

            if(dbManager.create(currentPoint)) {
                pointList.add(currentPoint);
            }
        }
    }

    public void addPointFromCanvas() {
        long startTime = System.nanoTime();
        Point currentPoint = new Point();
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss dd.MM.yyyy");
        currentPoint.setCurrentTime(dateFormat.format(new Date(System.currentTimeMillis())));

        pointFromForm.setxValue(pointFromCanvas.getxValue());

        currentPoint.setrValue(pointFromCanvas.getrValue());
        currentPoint.setxValue(pointFromCanvas.getxValue());
        currentPoint.setyValue(pointFromCanvas.getyValue());
        currentPoint.setHitResult(isItInArea(pointFromCanvas));

        String executionTime = String.valueOf(System.nanoTime() - startTime);
        executionTime +=" ns";

        currentPoint.setExecutionTime(executionTime);

        if(dbManager.create(currentPoint)) {
            pointList.add(currentPoint);
        }
    }


    public boolean isItInArea(Point dot) {
        if (dot != null){
            return isItInArea(dot.getxValue(), dot.getyValue(), dot.getrValue());
        } else return false;
    }

    public boolean isItInArea(double x, double y, double r) {
        return ((isHitRectangle(x, y, r) || isHitCircle(x, y, r) ||
                isHitTriangle(x, y, r)));
    }

    private boolean isHitRectangle(double xValue, double yValue, double rValue) {
        return xValue <= 0 && yValue >= 0 && yValue <= rValue/2 && xValue >= -rValue;
    }

    private boolean isHitCircle(double xValue, double yValue, double rValue) {
        return xValue <= 0 && yValue <= 0 && Math.sqrt(xValue*xValue + yValue*yValue) <= rValue;
    }

    private boolean isHitTriangle(double xValue, double yValue, double rValue) {
        return xValue >= 0 && yValue <= 0 && yValue >= xValue - rValue;
    }

    public void clear() {
        getPointList().forEach(dbManager::delete);
        pointList = new ArrayList<>();
    }

    public boolean checkR(Double r) {
        return r != null && r >= 1 && r<=4;
    }

    public boolean checkX(Double x) {
        double[] xValues = {-3,-2,-1,0,1,2,3,4,5};

        if (x == null) {
            return false;
        }

        for (int i = 0; i < xValues.length; i++){
            if (x == xValues[i]) {
                return true;
            }
        }

        return false;
    }

    public boolean checkY(Double y) {
        return y != null && y > -5 && y < 5;
    }


    public List<Point> getPointList() {
        if(pointList == null)
            pointList = dbManager.getAll();
        return pointList;
    }

    public void setPointList(List<Point> pointList) {
        this.pointList = pointList;
    }

    public Point getPointFromForm() {
        return pointFromForm;
    }

    public void setPointFromForm(Point pointFromForm) {
        this.pointFromForm = pointFromForm;
    }

    public Point getPointFromCanvas() {
        return pointFromCanvas;
    }

    public void setPointFromCanvas(Point pointFromCanvas) {
        this.pointFromCanvas = pointFromCanvas;
    }

    public DataBase getDbManager() {
        return dbManager;
    }

    public void setDbManager(DataBase dbManager) {
        this.dbManager = dbManager;
    }
}
