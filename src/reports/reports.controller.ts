import { Controller, Post, Body } from '@nestjs/common';
import { CreateReportDto } from './dtos/CreateReportDto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
}
