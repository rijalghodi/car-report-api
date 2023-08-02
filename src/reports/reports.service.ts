import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/CreateReportDto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
  // To use Repository provided by typeorm, use this pattern
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    // create an instance of class report
    const report = this.repo.create(reportDto);

    // Add user in instance of class report
    report.user = user;

    // Save in database. The repo.save automatically pick the user.id
    // and add it in the column of report table
    return this.repo.save(report);
  }
}
