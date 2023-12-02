package com.example.msorder.service;

import com.example.msorder.model.Order;
import com.example.msorder.model.Ticket;
import com.example.msorder.repository.IOrderRepository;
import com.example.msorder.repository.IticketRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final IOrderRepository repository;
    private final IticketRepository ticketrepository;

    public List<Order> findAll() {
        return repository.findAll();
    }

    public Optional<Order> findById(Long id){
        return repository.findById(id);
    }

    public Order save(Order order) {
        Double tot  = 0.0;
        for (Ticket tickets: order.getTicket()
             ) {
            Ticket tot2 = ticketrepository.findById(tickets.getID()).get();
            tot += tot2.getPrice();
        }
        order.setTotal_price(tot);
        return repository.save(order);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Order update(Order order) {
        return repository.save(order);
    }

    public List<Order> findByUserid(Long id){
        return repository.findByUserid(id);
    }

    public List<Order> findOrdersByMonth (int month){
        return repository.findOrdersByMonth(month);
    }

    public  ByteArrayOutputStream generatePdfStream(int id) throws DocumentException, IOException {

        Document document = new Document();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, outputStream);
        document.open();

        List<Order> orderList = repository.findOrdersByMonth(id);

        int total_orders = 0;
        Double total_revenue = 0.0;

        for (Order order: orderList) {
            total_orders++;
            total_revenue += order.getTotal_price();
        }

        URL imageUrl = new URL("https://grupo7-bucket.s3.amazonaws.com/logo.jpg");
        Image img = Image.getInstance(imageUrl);
        img.scaleToFit(200, 150);

        document.add(img);

        document.add(new Paragraph("\n"));

        String month = orderList.get(1).getDate_time().getMonth().name();
        Paragraph title =new Paragraph("BUSINESS REPORT OF "+month, FontFactory.getFont(FontFactory.HELVETICA,24));
        title.setAlignment(Paragraph.ALIGN_CENTER);

        document.add(title);

        document.add(new Paragraph("\n"));
        document.add(new Paragraph("\n"));

        String formattedRevenue = String.format("%.2f", total_revenue);
        document.add(new Paragraph("The total revenue for the month is $"+ formattedRevenue));
        document.add(new Paragraph("\n"));
        document.add(new Paragraph("The number of orders for the month is "+ total_orders));
        document.add(new Paragraph("\n"));

//        Map<Ticket, Long> ticketFrequencyMap = analyzeTickets(orderList);
//
//        // Find the top two tickets with most appearances
//        List<Map.Entry<Ticket, Long>> topTickets = ticketFrequencyMap.entrySet().stream()
//                .sorted(Map.Entry.<Ticket, Long>comparingByValue().reversed())
//                .limit(2).toList();
//
//        if (topTickets.size() >= 2) {
//            Ticket mostFrequentTicket = topTickets.get(0).getKey();
//            Ticket secondMostFrequentTicket = topTickets.get(1).getKey();
//
//            System.out.println("Most Frequent Ticket: " + mostFrequentTicket.getName());
//            System.out.println("Most Frequent Ticket: " + mostFrequentTicket.getID());
//            System.out.println("Second Most Frequent Ticket: " + secondMostFrequentTicket.getName());
//            System.out.println("Second Most Frequent Ticket: " + secondMostFrequentTicket.getID());
//
//        } else {
//            System.out.println("Insufficient data to determine top two tickets.");
//        }

        long uniqueUserCount = countUniqueUsers(orderList);


        document.add(new Paragraph("The number unique users this month was "+ uniqueUserCount));
        document.add(new Paragraph("\n"));
        String formattedAvgOrder = String.format("%.2f", total_revenue/total_orders);
        document.add(new Paragraph("The average spending per user was $"+ formattedAvgOrder));
        document.add(new Paragraph("\n"));
        String formattedSpending = String.format("%.2f", total_revenue/uniqueUserCount);
        document.add(new Paragraph("The average spending per user was $"+ formattedSpending));

        document.close();
        return outputStream;
    }
    Map<Ticket, Long> analyzeTickets(List<Order> orderList) {
        return orderList.stream()
                .flatMap(order -> order.getTicket().stream())
                .collect(Collectors.groupingBy(ticket -> ticket, Collectors.counting()));
    }

    public static long countUniqueUsers(List<Order> orderList) {
        Set<Long> uniqueUserIds = orderList.stream()
                .map(Order::getUserid)
                .collect(Collectors.toSet());

        return uniqueUserIds.size();
    }

}
